# single-list

## 使用场景

-   接口有 total

```bash


```

-   接口没有 total

```bash
没有total的话,开始默认无限大,当加载下一页没数据的话,直接赋值total等于list.length

```

#### 注意

```bash

# 初始数据必须占满一屏 (以铺满iphoneX为例)
注意一次加载的数据必须占满一屏，否则不能触发下一页
```
