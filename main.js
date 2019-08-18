function swiper(data) {  
    data.oUl.style.width = data.aLi.length+'00vw';
    data.oSwiper.addEventListener('touchstart',drag);
    data.oSwiper.addEventListener('touchmove',drag);
    data.oSwiper.addEventListener('touchend',drag);
    let x1 = null;
    let startX = null;
    data.oUl.transform={};//存储ul偏移量
    function drag(ev) { 
        //高内聚
        switch(ev.type){
            case 'touchstart':
            data.oUl.style.transition = '0';
            //2.1 获取手指触摸到ul时手指的位置x1,y1
            x1 = ev.changedTouches[0].clientX;
            //2.2 获取手指触摸到ul时ul的位置
            startX = data.oUl.transform['translateX']||0;
            console.log(startX)
            break;
            case 'touchmove':
            // 2.3 获取手指滑动的位置x2,y2
            let x2 = ev.changedTouches[0].clientX;
            // 2.4 计算ul新位置=旧位置+x2-x1
            let nowX = startX+x2-x1;
            // 2.5 给ul设置新位置
            cssTransform(data.oUl,'translateX',nowX);
            break;
            case 'touchend':
            let offset = data.oUl.transform['translateX'];
            // 3.1 当手指抬起时ul偏移量大于0时 ul偏移量设置为0;
                offset = Math.min(0,offset);
            // 3.2 当移动到最后一个li时(-(n-1)*w)不能移动
                offset = Math.max(-(data.aLi.length-1)*data.aLi[0].offsetWidth,offset);
            //    3.3 移动0.3w 取整 0-0.5回弹 0.5-1翻页
            let num = Math.round(-offset/data.aLi[0].offsetWidth);
            data.oUl.style.transition = '0.5s'
            cssTransform(data.oUl,'translateX',-num*data.aLi[0].offsetWidth);
            break;
        }
     }
    }
    function cssTransform(obj,attr,val){//获取obj 设置attr val
        if(obj.transform){
            obj.transform={}
        }
        switch(arguments.length){
            case 2: return obj.transform[attr]||0; break;
            case 3: 
              obj.transform[attr] = val;
              let str = '';//保存此时自定义对象里面所有样式
              for(var key in obj.transform){
                  switch(key){
                    case 'translate':
                    case 'translateX':
                    case 'translateY':
                    case 'translateZ':
                        str+=key+'('+obj.transform[key]+'px)'
                        break;
                  }
              }
              obj.style.transform=str;
              break;
        }
    }