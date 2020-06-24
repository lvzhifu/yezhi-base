### 发布范围包注意事项
```
    1.进入包内 ～npm publish --access=public
    2.之后才可以 ～lerna publish  进行包发布管理
```
### 添加引用包示例
```
    $ lerna add module-A packages/package-A
    $ lerna add package-B --scope=package-A
```
### 项目包初始化
```
    $ lerna bootstrap
```

### TiP
```
    目前移除了对教授架工具的版本统一管理
    // "yezhi-cli",
```
### 工程化工具欠缺

```
   自定义原始组件覆盖方案？
   公共全局样式配置方案？
   功能区块载入方案？
```
