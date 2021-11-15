# AWS Amplify 踩坑记录🕳

我也不知道这算不算 DevOps

## 试图从 staging clone 出一个配置一样的 dev 环境

### 被坑过程

Amplify backend 已有 staging，想直接再 Amplify Console clone 失败了， 出来一份空的 :/

在本地有 staging backend 配置表的分支 development 上拉取 dev environment:

```shell
amplify pull --appId <appId> --envName dev
```

之后进行 push，提示 `HostedUIProvidersCustomResourceInputs` update 失败。

```shell
Embedded stack arn:aws:cloudformation:<myapp> was not successfully updated. Currently in UPDATE_ROLLBACK_IN_PROGRESS with reason: The following resource(s) failed to update: [HostedUIProvidersCustomResourceInputs].
```

谷歌到 [这个 issue](https://github.com/aws-amplify/amplify-cli/issues/3798)，提示可能是 `tream-provider-info.json` 里缺 `auth` 内容。看了一下果然是空的。

在 JSON 里添加 `auth` 相关字段。

```json
{
  ...
  "categories": {
      "auth": {
        "<appName>": {
          "userPoolId": "...",
          "userPoolName": "...",
          "webClientId": "...",
          "nativeClientId": "..."
        }
      }
    }
}
```

再次 `amplify push`， 提示 `[webClientId, nativeClientId, userPooId] does not exist in the template`。

```shell
UPDATE_FAILED auth<appName> AWS::CloudFormation::Stack <TIME> Parameters: [webClientId, nativeClientId, userPoolId] do not exist in the template
```

看起来只是 `/amplify/backend/auth/<appName>/<appName>-cloudformation-template.yml` 没配好。我还没 commit my changes，直接用了上一个 commit 的 `yaml`：

```shell
git checkout <commit-hash> -- ./amplify/backend/auth/<appName>/<appName>-cloudformation-template.yml
```

再进行一次 `amplify push`……好像还是不行。

那我 `amplify update auth` 呢？反正现在 `dev` 是空的。走了一遍流程尽量什么也没改：

```shell
# Match: repoName on develop [Node.js 14.18.1] ❯ amplify update auth
Please note that certain attributes may not be overwritten if you choose to use defaults settings.

You have configured resources that might depend on this Cognito resource.  Updating this Cognito resource could have unintended side effects.

√ A migration is needed to support latest updates on auth resources.
Recommended to try in a non-production environment first. Run "amplify env add" to create or clone an environment.
Learn more about this migration: https://docs.amplify.aws/cli/migration/override
Do you want to migrate auth resource "<appName>"? (Y/n) · no
Using service: Cognito, provided by: awscloudformation
 What do you want to do? Walkthrough all the auth configurations
 Select the authentication/authorization services that you want to use: User Sign-Up, Sign-In, connected with AWS IAM
 controls (Enables per-user Storage features for images or other content, Analytics, and more)
 Allow unauthenticated logins? (Provides scoped down permissions that you can control via AWS IAM) No
 Do you want to enable 3rd party authentication providers in your identity pool? No
 Do you want to add User Pool Groups? No
 Do you want to add an admin queries API? No
 Multifactor authentication (MFA) user login options: OFF
 Email based user registration/forgot password: Enabled (Requires per-user email entry at registration)
 Specify an email verification subject: [ArtApp] Request to confirm your email address
 Specify an email verification message: Confirm your email address
Your confirmation code is below -- enter it in your app and we'll help you get signed in.

{####}

If you didn't request the mail, there's nothing to worry about -- you can safely ignore it.
 Do you want to override the default password policy for this User Pool? No
 Specify the app's refresh token expiration period (in days): 30
 Do you want to specify the user attributes this app can read and write? No
 Do you want to enable any of the following capabilities?
 Do you want to use an OAuth flow? Yes
 What domain name prefix do you want to use? 3gz4lx4uwbff
 Which redirect signin URIs do you want to edit?
 Do you want to add redirect signin URIs? No
 Which redirect signout URIs do you want to edit?
 Do you want to add redirect signout URIs? No
 Select the OAuth flows enabled for this project. Authorization code grant
 Select the OAuth scopes enabled for this project. Phone, Email, OpenID, Profile, aws.cognito.signin.user.admin
 Select the identity providers you want to configure for your user pool: Facebook, Google

 You've opted to allow users to authenticate via Facebook.  If you haven't already, you'll need to go to https://deve
lopers.facebook.com and create an App ID.

 Enter your Facebook App ID for your OAuth flow:  test
 Enter your Facebook App Secret for your OAuth flow:  test

 You've opted to allow users to authenticate via Google.  If you haven't already, you'll need to go to https://develo
pers.google.com/identity and create an App ID.

 Enter your Google Web Client ID for your OAuth flow:  test
 Enter your Google Web Client Secret for your OAuth flow:  test
? Do you want to configure Lambda Triggers for Cognito? Yes
? Which triggers do you want to enable for Cognito
✅ Successfully updated auth resource <appName> locally

✅ Some next steps:
"amplify push" will build all your local backend resources and provision it in the cloud
"amplify publish" will build all your local backend and frontend resources (if you have hosting category added) and provision it in the cloud

✅ Successfully updated resource update locally

✅ Some next steps:
"amplify push" will build all your local backend resources and provision it in the cloud
"amplify publish" will build all your local backend and frontend resources (if you have hosting category added) and provision it in the cloud
```

再 `amplify push` 一次，还是不行。删了重开吧，这次不在 amplify console 做了。

```shell
 ❯ amplify env add
Note: It is recommended to run this command from the root of your app directory
? Enter a name for the environment dev
Using default provider  awscloudformation
? Select the authentication method you want to use: Amplify Admin UI
Adding backend environment dev to AWS Amplify Console app: d1e84vh5xbcfwc
\ Initializing project in the cloud...
```

好像啥也挺成功的…… 再次尝试 `amplify push`

```shell
amplify push --yes
```

报错 `Error: File at path: 'amplify/backend/auth/<appName>/build/parameters.json' does not exist'`，看了一下虽然没有 `build` 但有 `parameters.json`…… 创建个路径试一下？ —— 终于成功了。很可能是 aws-amplify 版本不同的锅。

### 总结

1. 千万不要随便更新 `aws-amplify` 版本，配置文件很可能位置会变
2. 最好不要在 AWS Amplify Console 创建环境。

正确的基于已存环境创建新环境的做法是 **使用 Amplify CLI** 在有配置文件的分支创建 environment 然后 push。

```bash
amplify env add
amplify push --yes
```
