/*
  fill 颜色， 传入数组，按顺序排列颜色，返回的依次是啥就是啥
  函数支持自定义，直接返回颜色即可，通过field，返回的字段来判断,

  data： 数据渲染列表

  label: 文本标注配置项，目前只支持常量配置，不支持数据映射，（即不支持传入的数据，只支持地图原本的数据）

  joinBy: 数据管理， 也就是说如果你的数据 与地图的数据相等，那么会在之后获取的对象中有你存在的，支持  NAME_CHN（地区名称）,adcode（地区编码），如 [ 'adcode', 'code' ], 第一个为固定 NAME_CHN 或 adcode， 第二个为你的数据
*/
