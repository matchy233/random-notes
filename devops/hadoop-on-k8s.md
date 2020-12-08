# 在 kubernetes 集群部署 hadoop

实际上这是一个差的想法。

## 使用 helm 安装

### 下载 helm

```bash
curl https://baltocdn.com/helm/signing.asc | sudo apt-key add -
sudo apt-get install apt-transport-https --yes
echo "deb https://baltocdn.com/helm/stable/debian/ all main" | sudo tee /etc/apt/sources.list.d/helm-stable-debian.list
sudo apt-get update
sudo apt-get install helm
```

### Create a chart

```bash
helm create mychart
```

默认的 chart 是个 `nginx` web server。可以部署上去看看

### Install a chart

```bash
helm install mychart-release-name mychart
```

```bash
export POD_NAME=$(kubectl get pods --namespace default -l "app.kubernetes.io/name=mychart-release-name,app.kubernetes.io/instance=cluster-name" -o jsonpath="{.items[0].metadata.name}")
export CONTAINER_PORT=$(kubectl get pod --namespace default $POD_NAME -o jsonpath="{.spec.containers[0].ports[0].containerPort}")
echo "Visit http://127.0.0.1:8080 to use your application"
kubectl --namespace default port-forward $POD_NAME 8080:$CONTAINER_PORT
```

### Uninstall chart

```bash
$ helm list
NAME                     NAMESPACE       REVISION        UPDATED                                 STATUS          CHART           APP VERSION
mychart-release-name     default         1               2020-12-05 18:53:26.6995927 +0900 KST   deployed        mychart-0.1.0   1.16.0
```

```bash
helm uninstall mychart-release-name
```

Can also be done by `delete` `del` `un`.

## Install `hadoop` chart

To install the chart with the release name hadoop that utilizes 50% of the available node resources:

```bash
helm install hadoop stable/hadoop
```

This command will deploy at least 4 pods on your cluster according to the default settings.

1. hdfs namenode pod
2. hdfs datanode
3. yarn resource manager
4. yarn name manager

### Usage

1. You can check the status of HDFS by running this command:

   ```bash
   kubectl exec -n default -it hadoop-hadoop-hdfs-nn-0 -- hdfs dfsadmin -report
   ```

3. You can list the yarn nodes by running this command:

   ```bash
   kubectl exec -n default -it hadoop-hadoop-yarn-rm-0 -- yarn node -list
   ```

4. Create a port-forward to the yarn resource manager UI:

   ```bash
   kubectl port-forward -n default hadoop-hadoop-yarn-rm-0 8088:8088
   ```

   Then open the ui in your browser:

   ```bash
   open http://localhost:8088
   ```

5. You can run included hadoop tests like this:

   ```bash
   kubectl exec -n default -it hadoop-hadoop-yarn-nm-0 -- hadoop jar /usr/local/hadoop/share/hadoop/mapreduce/hadoop-mapreduce-client-jobclient-2.9.0-tests.jar TestDFSIO -write -nrFiles 5 -fileSize 128MB -resFile /tmp/TestDFSIOwrite.txt
   ```

6. You can list the mapreduce jobs like this:

   ```bash
   kubectl exec -n default -it hadoop-hadoop-yarn-rm-0 -- mapred job -list
   ```

7. This chart can also be used with the zeppelin chart

   ```bash
   helm install --namespace default --set hadoop.useConfigMap=true,hadoop.configMapName=hadoop-hadoop stable/zeppelin
   ```

8. You can scale the number of yarn nodes like this:

   ```bash
   helm upgrade hadoop --set yarn.nodeManager.replicas=4 stable/hadoop
   ```

   Make sure to update the values.yaml if you want to make this permanent.

## Edit `helm` release

```bash
helm upgrade -f new-values.yml {release name} {package name or path} --version {fixed-version}
```
