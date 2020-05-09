### 发布范围包注意事项
```
    1.进入包内 ～npm publish --access=public
    2.之后才可以 ～lerna publish  进行包发布管理
```
### 添加引用包示例
```
    ～lerna add module-A packages/package-A
    ～lerna add package-B --scope=package-A
```