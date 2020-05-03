
 window.addEventListener("DOMContentLoaded", function() {
   
   
    var oimg = document.querySelector(".wrap .goods-details .left-img .img-box .img");
    var oimgbox = document.querySelector(".wrap .goods-details .left-img .img-box"); 
    var imgSmall = document.querySelector(".wrap .goods-details .left-img .img-box .img img"); 

    var oleftBtn = document.querySelector(".wrap .goods-details .left-img .carding-strip .left-btn");
    var orightBtn = document.querySelector(".wrap .goods-details .left-img .carding-strip .right-btn");
    var othumbnail = document.querySelector(".wrap .goods-details .left-img .carding-strip .thumbnail-box .thumbnail");
    

  
  

   
    

    //重置蒙版
    var mask = null;
    //重置显示的大图
    var bigImg = null;
    //点击img缩略图父级li的下标
    var liIndex = 0;

    //arr保存每次点击的配置信息的数据
    var arr = new Array(goodDate.goodsDetail.crumbData.length);
    arr.fill(0);//初始的每一项都为0
    //配置商品的价格
    var collocationMoney = 0;


    //动态的获取商品分类所属
    classification();
    function classification (){
        var sort = document.querySelector(".wrap .goods-details .classification");
        var path = goodDate.path;
       
        path.forEach(function(item,index){
            if(index !== path.length - 1){
                var a = document.createElement("a");
                a.innerHTML = item.title;
                a.href = item.url;
            }else{
                var a = document.createElement("a");
                a.innerHTML = item.title;
            }
            sort.appendChild(a);
            


        })
    }
    //动态加载商品基本信息
    goodsInfo()
    function goodsInfo(){
        var  goodsInfo = document.querySelector(".wrap .goods-details .goods-overbooking .goods-info");
        var goodsDetail =goodDate.goodsDetail;//是一个对象
        var goodsNodes = `<h3>${goodsDetail.title}</h3>
                          <p>${goodsDetail.recommend}</p> 
                          <div class="price-promotion">
                              <!-- 价格 -->
                              <div class="price-box" >
                                  <span>价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</span>
                                  <span>￥</span>
                                  <span class="price">${goodsDetail.price}</span>
                                  <span>降价通知</span>
                                  <span>累计评价<em>${goodsDetail.evaluateNum}</em></span>
                              </div>
                              <!-- 促销 -->
                              <div class="promotion">
                                  <span>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</span>
                                  <p><span>${goodsDetail.promoteSales.type}</span>${goodsDetail.promoteSales.content}</p>
                              </div>           
                          </div>
                          <!-- 配送 -->
                          <div class="delivery-box">
                              <div class="support">
                                  <span>支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</span>
                                  <p>${goodsDetail.support}</p>
                              </div>
                              <div class="address">
                                  <span>配&nbsp;送&nbsp;至</span>
                                  <p>${goodsDetail.address}</p>
                              </div>
                          </div>`;

        goodsInfo.innerHTML +=  goodsNodes;
                          




    }
    //放大镜效果 
    magnifierEffect ();
    function magnifierEffect (){
        //动态获取图片的地址(数组)
        var  imgSrc = goodDate.imgsrc;
        

        //动态的加载缩略图
        imgSrc.forEach(function(item,index){
            var li = document.createElement("li");
            var img = new Image; 
            img.src = item.s;
            li.appendChild(img);
            othumbnail.appendChild(li);


        })





        //点击缩略图动态加载小图和取货liIndex
        othumbnail.onclick = function (e) {
            var oli = document.querySelectorAll(".wrap .goods-details .left-img .carding-strip .thumbnail-box .thumbnail li");
            if (e.target.nodeName === "IMG") {
                // imgSmall.src = e.target.src;


                for (var i = 0; i < oli.length; i++) {
                    if (oli[i] === e.target.parentNode) {
                        //拿到点击的img标签父级元素li的下标并返回
                        liIndex = i;

                    }
                    // 设置放大镜内显示的小图地址
                    imgSmall.src = imgSrc[liIndex].s;


                }

            }

        }
      
        

        //鼠标移入事件
        oimg.onmouseenter = function(){
            if (!mask) {
                // 生成一个蒙版
                 mask = document.createElement("div");
                //蒙版的初始位置
                var maskX = mask.clientWidth;
                var maskY = mask.clientHeight;
                mask.className = "mask";
                oimg.appendChild(mask);
            }

            if(!bigImg){
                //生成一个大图元素
                bigImg = document.createElement("div");
                bigImg.className = "bigImg-box"
                var img = new Image();
                img.className = "bigImg";
                img.src = imgSrc[liIndex].b;
                bigImg.appendChild(img);
                oimgbox.appendChild(bigImg);
            }
            //大图片的初始位置
        
 
            
            //鼠标移动事件
            oimg.onmousemove = function (e){
                //鼠标的x轴位置
                var sbLeft = e.clientX;
                //鼠标的y轴位置
                var sbTop = e.clientY;
                
                var oimgPosition = {
                    top:oimg.getBoundingClientRect().top,
                    left:oimg.getBoundingClientRect().left
                }
                // 鼠标移动的距离
                var sbDisX = sbLeft - oimgPosition.left - mask.clientWidth/2;
                var sbDisY = sbTop - oimgPosition.top - mask.clientHeight/2;
               

                //蒙版的移动的结束位置(将要移动到的位置)
                var maskendX = sbDisX +  maskX ;
                var maskendY = sbDisY +  maskY ;
                if(maskendX < 0){
                    maskendX = 0;

                }else if(maskendX > oimg.clientWidth - mask.clientWidth){
                    maskendX = oimg.clientWidth - mask.clientWidth;

                }
                if(maskendY < 0){
                    maskendY = 0;

                }else if(maskendY > oimg.clientHeight - mask.clientHeight){
                    maskendY = oimg.clientHeight - mask.clientHeight;

                }
           
                mask.style.top =  maskendY + "px";
                mask.style.left =  maskendX + "px";

                
                //小图片能移动的距离 : 大图片能移动的距离 
                var ratioX = (oimg.offsetWidth - mask.offsetWidth)/(img.offsetWidth - bigImg.offsetWidth ); 
                var ratioY = (oimg.offsetHeight - mask.offsetHeight)/(img.offsetHeight - bigImg.offsetHeight ); 
                //设置大图移动的距离
                img.style.marginTop = - maskendY / ratioY  + "px"
                img.style.marginLeft =  - maskendX / ratioX  + "px"
                
            }
            //鼠标移出事件
            oimg.onmouseleave = function(){
                oimg.onmousemove = null;
                oimg.onmouseleave = null;
                oimg.removeChild(mask);
                oimgbox.removeChild(bigImg);
                mask = null;
                bigImg = null;
         
            }

           
           
   
       }

   }
   //缩略图按钮点击移动事件
   ulMover();
   function ulMover (){

        var oli = document.querySelectorAll(".wrap .goods-details .left-img .carding-strip .thumbnail-box .thumbnail li");
       //能移动的图片张数
       var moveImgN = oli.length - 5;
       //点击一次移动的图片张数
       var number = 2;
       //移动一张图片的距离 = li的widht
       var disImg = oli[0].clientWidth;
       //点击一次ul移动的距离
       var uldis = disImg * number;
       
       orightBtn.onclick = function(){
           //获取ul的初始位置
           var ulX = othumbnail.offsetLeft;
           
           if(ulX + -uldis < -moveImgN * disImg ){
              
              othumbnail.style.left = -moveImgN * disImg + "px"

           }
           else{
            othumbnail.style.left = ulX + -uldis + "px"
           }
           
         
       }

       oleftBtn.onclick = function(){
        var ulX = othumbnail.offsetLeft;
    
        if(ulX + uldis >0 ){   
           othumbnail.style.left = 0;
        }
        else{
         othumbnail.style.left = ulX + uldis + "px"
        }
        
       }

   }
   //动态生成商品下单配置详情
   configureInfo();
   function configureInfo(){
       //获取需要生成dl元素的父级 
       var ogoodsConfigure = document.querySelector(".wrap .goods-details .goods-overbooking .goods-configure");

       //动态获取商品配置信息(数组)
       var configure = goodDate.goodsDetail.crumbData;

       configure.forEach(function (item) {
           //  生成一个dl
           var dl = document.createElement("dl");
           // 生成一个dt 
           var dt = document.createElement("dt");
           dt.innerHTML = item.title;
           dl.appendChild(dt);

           //遍历data属性 动态生成dd
           item.data.forEach(function (item) {
               var dd = document.createElement("dd");
               dd.innerHTML = item.type;
               //生成自定义属性并赋值
            //    dd.setAttribute("money",item.changePrice);
               dl.appendChild(dd);

           })
           ogoodsConfigure.appendChild(dl);
       })

          //给第一个dd添加默认的颜色
       var firstDd = ogoodsConfigure.querySelectorAll("dl dt + dd");
       firstDd.forEach(function (item) {
           item.style.color = "#FF0000";
       })

       
       
       //初始点击配置按钮父级的ul的下标
       var dlIndex = null;
       var ddIndex = null;
    

       //点击按钮的时候动态显示选中的配置信息
       ogoodsConfigure.onclick = function(e){
           
         

           //获取上一次点击生成mark标签
           var omark = document.querySelectorAll(".wrap .goods-details .goods-overbooking .goods-configure .selection-configure mark");
           var markBox = document.querySelector(".wrap .goods-details .goods-overbooking .goods-configure .selection-configure");
           var dl = document.querySelectorAll(".wrap .goods-details .goods-overbooking .goods-configure dl");
           //var dd =  document.querySelectorAll(".wrap .goods-details .goods-overbooking .goods-configure dl dd"); 
           
        
           if(e.target.nodeName === "DD"){

               for(var i=0;i<dl.length;i++){
                   if(e.target.parentNode === dl[i]){
                       //确定没次点击配置信息父级在 dl伪数组中的下标
                      dlIndex = i;
                   }

               }
               var ddNodes = dl[dlIndex].querySelectorAll("dd");   
               ddNodes.forEach(function(item,index){
                   if(e.target === item ){
                       //获取没次点击的dd的下标
                       ddIndex = index;
                   }

               })

                //重置其他项的颜色
                var dd = dl[dlIndex].querySelectorAll("dd");
                dd.forEach(function(item){
                    item.style.color = "#666";

                })
            
               //设置点击项的颜色
               e.target.style.color = "#FF0000";
              

               //删除上一次生成的mark节点
               markBox.innerHTML = "" ;
            //    if (omark.length !== 0) {
            //        omark.forEach(function (item) {
            //            markBox.removeChild(item);

            //        })
            //    }

               
               //拿到dd的值并赋值给arr的对应项
            //    arr[dlIndex] = e.target.innerHTML;
               arr[dlIndex] = configure[dlIndex].data[ddIndex];
            

                //根据点击的配置不同动态的改变手机的价格
                getMoney();
             
              
               arr.forEach(function (item,index) {
                   if (item) {
 
                       //创建一个mark元素
                       var mark = document.createElement("mark");
                       mark.innerHTML = item.type;
                       var a = document.createElement("a");
                       a.innerHTML = "X";
                       mark.appendChild(a);
                       markBox.append(mark);

                       a.onclick = function(){
                        
                           //删除点击的mark
                           markBox.removeChild(mark);
                           //重置对应的数组中的值
                           arr[index] = 0;
                           //重置其他项的颜色
                           var dl = document.querySelectorAll(".wrap .goods-details .goods-overbooking .goods-configure dl")
                           var dd = dl[index].getElementsByTagName("dd");
                           for(var i=0;i<dd.length;i++){
                            dd[i].style.color = "#666";
                           }
                           //默认配置项显示红色
                           dd[0].style.color ="#FF0000";

                           //更改手机价格  
                           getMoney();
                       }
                   }



               })
                

           }




           
           
          



           
       }
   }  
   //加入购物车事件
   shoppingCart()
   function shoppingCart(){
       var inputNode = document.querySelector(".wrap .goods-details .goods-overbooking .add-number form .number");
       var add =   document.querySelector(".wrap .goods-details .goods-overbooking .add-number form .add");   
       var reduce = document.querySelector(".wrap .goods-details .goods-overbooking .add-number form .reduce");
       
       add.onclick = function(){
           inputNode.value = +inputNode.value + 1;
           getMoney();

       }
       reduce.onclick = function(){
           if(inputNode.value -1 > 0){
            inputNode.value = +inputNode.value - 1;
           }
           getMoney();
       }

   }
   //动态切换选项卡
   toggleTab();
   function toggleTab(){
       var obuttom = document.querySelectorAll(".wrap .option .tap .title button");
       var odiv = document.querySelectorAll(".wrap .option .tap .box ");
       
       new Tab(obuttom,odiv); 
    //    obuttom[0].onclick = function(){
              //active属性我去除了
    //        this.className = this.className.split(" active");
    //        this.className = this.className + " active";
    //        obuttom[1].className = obuttom[1].className.split(" active")
    //        odiv[0].className = odiv[0].className.split(" display");
    //        odiv[0].className = odiv[0].className + " display";
    //        odiv[1].className = odiv[1].className.split(" display");
           
           
    //     }
    //     obuttom[1].onclick = function(){
    //         this.className = this.className + " active";
    //         obuttom[0].className = obuttom[0].className.split(" active")
    //         odiv[1].className = odiv[1].className + " display";
    //         odiv[0].className = odiv[0].className.split(" display");
           
    //      }

   }
   //选择搭配动态生成总价
   totalCollocation();
   function totalCollocation(){
   var olabel = document.querySelectorAll(".wrap .option .introduce .choice .content .configureCommodity li label");
   var em = document.querySelector(".wrap .option .introduce .choice .content .main-goods em");
   var span = document.querySelector(".wrap .option .introduce .choice .content .settlement .price");
  
   em.innerHTML = "￥" + goodDate.goodsDetail.price;
   span.innerHTML = "￥" + goodDate.goodsDetail.price;;
   olabel.forEach(function(item,index){
    
       item.onchange = function(){
      
       var inputNode = item.querySelector("input"); 
     
       
       if(inputNode.checked){
         collocationMoney +=  parseInt(inputNode.value);
         
       }else{
        collocationMoney -=  parseInt(inputNode.value);
        
       }
       getMoney();
       
       }
   })
   
   }
   //动态的切换商品信息
   fun();
   function fun(){
       var aNodes = document.querySelectorAll(".wrap .option .details .nav a ");
       var divNodes = document.querySelectorAll(".wrap .option .details > div");
       new Tab(aNodes,divNodes);
   }

   //动态切换右侧固定导航条
   switchNav();
   function switchNav (){
       var topBtn = document.querySelector(".wrap .toolbar .top-btn");
       var toolbar = document.querySelector(".wrap .toolbar"); 
       var oli = document.querySelectorAll(".wrap .toolbar .toolbar-nav li");
       var sign = true;
       var odiv = document.querySelector(".wrap .toolbar .return ");
       topBtn.onclick = function (){
          if(sign){
            toolbar.style.right = "0";
            this.style.background =  "#7a6e6e url('img/cross.png') center center no-repeat";
            this.style.backgroundSize = "cover";
   
          }else{
            toolbar.style.right = "-294px";
            this.style.background =  "#7a6e6e url('img/list.png') center center no-repeat";
            this.style.backgroundSize = "cover";
          }
          sign = !sign;
       }

       oli.forEach(function(item){
           item.onmouseenter = function(){
               var ospan = this.querySelector("span");
               var oi = this.querySelector("i");
               ospan.style.left = "-67px";
               oi.style.backgroundColor = "red";
               

           } 
           item.onmouseleave = function(){
              var ospan = this.querySelector("span");
              var oi = this.querySelector("i");
              ospan.style.left = "40px";
              oi.style.backgroundColor = "#7a6e6e";
        } 
       })

       odiv.onmouseenter = function(){
        var ospan = this.querySelector("span");
        var oi = this.querySelector("i");
        ospan.style.left = "-92px";
        oi.style.backgroundColor = "red";
        
       }
       odiv.onmouseleave = function(){
        var ospan = this.querySelector("span");
        var oi = this.querySelector("i");
        ospan.style.left = "0px";
        oi.style.backgroundColor = "#7a6e6e";
       }
      
      

   }

   //选项卡构造函数
   function Tab(obuttom,odiv){
       this.obtn = obuttom;
       this.odiv = odiv;
       var _this = this; 
        
       this.obtn.forEach(function(item,index){
           item.onclick = function(){
            _this.fun(_this,index);
           }

       })
       
       Tab.prototype.fun = function(btn,index){
           //去除obtn上面的所用active  给当前点击的添加
           //去除odiv上面的display  给当前点击的添加
           this.obtn.forEach(function(item){
               item.className = item.className.split(" active").join("");
           })
           this.odiv.forEach(function(item){
               item.className = item.className.split(" display").join("");
           })
           btn.obtn[index].className = btn.obtn[index].className + " active";
           btn.odiv[index].className =  btn.odiv[index].className +" display";

       }



   }

   //点击加入购物按钮把信息保存到浏览器缓存内
   addbtn();
   function addbtn(){
    
       var btn = document.querySelector(".wrap .goods-details .goods-overbooking .add-number form .addShoppingCart button");
       btn.onclick = function (){
           var goodImg = document.querySelector(".wrap .goods-details .left-img .carding-strip .thumbnail-box .thumbnail li:nth-child(3) img").src;
           var goodTitle = document.querySelector(".wrap .goods-details .goods-overbooking .goods-info h3").innerHTML;
           var goodNum = document.querySelector(".wrap .goods-details .goods-overbooking .add-number form div .number").value;
           var goodPrice = document.querySelector(".wrap .goods-details .goods-overbooking .goods-info .price-promotion .price-box span:nth-child(3)").innerHTML / goodNum;
               goodPrice =  goodPrice.toFixed(2);
           var goodTxt="";
           var dd = document.querySelectorAll(".wrap .goods-details .goods-overbooking .goods-configure dl dd");
           dd.forEach(function(item){
               if(item.style.color == "rgb(255, 0, 0)"){
                  goodTxt = goodTxt + item.innerHTML + " "; 
               }

           }) 
           var goodObj = {
               goodImg: goodImg,
               goodTitle: goodTitle,
               goodTxt: goodTxt,
               goodPrice: goodPrice,
               goodNum, goodNum
           } 
           //保存到缓存内
           localStorage.setItem("goodObj",JSON.stringify(goodObj));

           location.href = "./index1.html";
       
          
       }
     

   }


    //计算手机价格函数
    function getMoney(){
        var em = document.querySelector(".wrap .option .introduce .choice .content .main-goods em");
        var span = document.querySelector(".wrap .option .introduce .choice .content .settlement .price");
        var inputNode = document.querySelector(".wrap .goods-details .goods-overbooking .add-number form .number");   
        // 手机的价格
        var totalPrice = goodDate.goodsDetail.price;
        var oprice = document.querySelector(".wrap .goods-details .goods-overbooking .goods-info .price-promotion .price-box span:nth-child(3)");
        arr.forEach(function(item){
            if(item !== 0){
                totalPrice += parseInt(item.changePrice); 
            }
        })
        totalPrice = totalPrice * inputNode.value;
        oprice.innerHTML = totalPrice;
        em.innerHTML = "￥" + totalPrice;
        totalPrice += collocationMoney;
        span.innerHTML = "￥" + totalPrice;
       
       
        
}





 })