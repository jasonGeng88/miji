##构建环境

 - 基于 node 4
 - 用cnpm安装




## 开发环境构建 


    - sudo gulp build
    - sudo gulp serve
    
    
## 生产环境构建
   
   - sudo gulp build --env=pro
   - sudo gulp serve --env=pro
   
   

   
## 固定的几种配置的方式：
   
   sudo gulp build 默认为 --env=dev
   
   sudo gulp build --env=dev
   
    url配置：
        api = 'http://www.domain.com';
        domain = 'http://static.domain.com';
        cdn = 'http://static.domain.com';
   
   sudo gulp build --env=pro
   
    url配置：
       api = 'http://www.domain.com';
       domain = 'http://www.domain.com';
       cdn = 'http://static.domain.com';
   
   
   sudo gulp build --env=ip
   
    url配置：
       api = 'http://192.168.199.161:8018';
       domain = 'http://192.168.199.161:8018';
       cdn = 'http://192.168.199.161:8019';

## 完全自定义的编译配置
   
   
   sudo gulp build --env=custom --api=[api的地址] --cdn=[cdn的地址] --domain=[domain的地址] --type=[d： 编译开发版本，p:编译生产版本]
   
   例：
   
   sudo gulp build --env=custom --api=192.168.199.161:8018 --cdn=192.168.199.161:8019 --domain=192.168.199.161:8018
   


