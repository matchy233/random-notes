# 群友教我写 js

完全不懂前端硬写课设的时候学到的一星半点姿势。

## `this` in js

I defined a `class` called `PictureStore` which contains a property `rootStore` and has a function `uploadPicture()`. Inside `uploadPicture()`, I need to access `rootStore` to retrieve some properties.

At first I defined them in this way:

```typescript
class PictureStore {
  rootStore : RootStore;
  ... // omitted
  async uploadPicture() {
    ... // omitted
    let something = this.rootStore.doSomething();
    ... // omitted
  }
  ... // omitted
}
```

Unfortunately I received `Unhandled TypeError`, which claimed that `rootStore` is `undefined`.

[Master Bai](https://github.com/jokester) told me to re-write the definition of `uploadPicture()` in this way:

```typescript
class PictureStore {
rootStore : RootStore;
  ... // omitted
  uploadPicture = async () => {
    ... // omitted
    let something = this.rootStore.doSomething();
    ... // omitted
  }
  ... // omitted
}
```

which fixed the bug nicely.

The reason is that `this` in js works weirdly (well, in my opinion).

[MDN's document about `this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) explains nicely about everything related to `this`. I'll extract the contents related to my bug here:

In strict mode (which is the mode my application uses), if the value of `this` is not set when entering an execution context, it remains as `undefined`. However, in arrow functions (to understand it naively, they are functions in the form of `var fun = () => {}`), `this` retains the value of the **enclosing lexical** context's `this` , that is, the `this` of arrow functions inside a class will be resolved to the class's `this`.
