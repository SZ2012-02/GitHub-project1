
 window.addEventListener("DOMContentLoaded", function() {

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

   //点击选中商品
   selectionGoods();
   function selectionGoods(){
          //动态的加载加入购物车的商品
          var goods = cartDate.goods;
          var goodObj = localStorage.getItem("goodObj");

          if(goodObj){
              goods.push(JSON.parse(goodObj));
          }

          var oul = document.querySelector(".wrap .all-merchandise .goods");
          
          goods.forEach(function (item){
              var liNode = `<li class="goods-item">
                                    <div class="item1"><input type="checkbox"></div>
                                    <div class="item2">
                                        <img src="${item.goodImg}" alt="">
                                        <p>${item.goodTitle}</p>
                                    </div>
                                    <div class="item3">${item.goodTxt}</div>
                                    <div class="item4">${item.goodPrice}</div>
                                    <div class="item5">
                                        <a class="reduce">-</a>
                                        <input value="${item.goodNum}" type="text">
                                        <a class="add" >+</a>
                                    </div>
                                    <div class="item6">${item.goodPrice}</div>
                                    <div class="item7">
                                        <a class="delete">删除</a>
                                        <a class="move" >移到收藏栏</a>
                                    </div>
                            </li>` 
          oul.innerHTML =  oul.innerHTML + liNode;



          })


          var ocheckbox = document.querySelectorAll(".wrap .all-merchandise .goods .goods-item div:nth-child(1) input");
          var oallElection = document.querySelector(".wrap .all-merchandise .settlement .left label input");
          var oadd = document.querySelectorAll(".wrap .all-merchandise .goods .goods-item div:nth-child(5) .add");
          var oreduce = document.querySelectorAll(".wrap .all-merchandise .goods .goods-item div:nth-child(5) .reduce");
          var olabel = document.querySelector(".wrap .all-merchandise .settlement .left label");
          var oem = document.querySelector(".wrap .all-merchandise .settlement .right span em");
          var odelete = document.querySelectorAll(".wrap .all-merchandise .goods .goods-item div:nth-child(7) .delete");
          var oallDelete = document.querySelector(".wrap .all-merchandise .settlement .left .allDelete"); 
          var totalPrice = 0;


         






          //商品多选框绑定事件
          ocheckbox.forEach(function(item,index){
          item.onchange = function(){
            var osubtotal = this.parentNode.parentNode.querySelector("div:nth-child(6)");
          
            if(this.checked){
                  var a = document.querySelectorAll(".wrap .all-merchandise .goods .goods-item div:nth-child(1) input:checked").length
                  var b = document.querySelectorAll(".wrap .all-merchandise .goods .goods-item div:nth-child(1) input").length
                 
                  if(a === b){
                    oallElection.checked = true;
                  }
                  totalPrice = totalPrice + parseInt(osubtotal.innerHTML); 
                  oem.innerHTML = totalPrice;
              }else{
                  var a = document.querySelectorAll(".wrap .all-merchandise .goods .goods-item div:nth-child(1) input:checked").length
                  var b = document.querySelectorAll(".wrap .all-merchandise .goods .goods-item div:nth-child(1) input").length
                  if (a !== b) {
                    oallElection.checked = false;
                  }
                  totalPrice = totalPrice - parseInt(osubtotal.innerHTML);
                  oem.innerHTML = totalPrice;
                  
              }

            
          }

      })
          //加按钮绑定事件
          oadd.forEach(function(item,index){
              item.onclick = function(){
                var oinput = this.parentNode.querySelector("input"); 
                oinput.value = parseInt(oinput.value) + 1; 
                getMoney(index,oinput.value);
              } 
          })

          //减号按钮绑定事件
          oreduce.forEach(function(item,index){
            item.onclick = function(){
              var oinput = this.parentNode.querySelector("input"); 
              if(oinput.value > 1){
                oinput.value = parseInt(oinput.value) - 1;
                getMoney(index,oinput.value);
              } 
            } 
        })

        // 全选按钮绑定事件
        olabel.onchange = function (){
            var oinput = this.querySelector("input");
           
            if(oinput.checked){
                ocheckbox.forEach(function(item){
                item.checked = true;
                var osubtotal = item.parentNode.parentNode.querySelector("div:nth-child(6)");
                totalPrice = totalPrice + parseInt(osubtotal.innerHTML); 
               

                })
                
               
            }else{
                ocheckbox.forEach(function(item){
                    item.checked = false;
                    var osubtotal = item.parentNode.parentNode.querySelector("div:nth-child(6)");
                    totalPrice = totalPrice - parseInt(osubtotal.innerHTML);
                   

                 })
               
            }
            oem.innerHTML = totalPrice;

        }
        
        //删除按钮事件绑定
        odelete.forEach(function (item){
            item.onclick = function (){
                if(confirm("是否删除该商品")){
                   var oli = item.parentNode.parentNode;
                   var oul = oli.parentNode;
                   var oinput = oli.querySelector("div:nth-child(1) input");
                   var subtotal = oli.querySelector("div:nth-child(6)").innerHTML;
                   oul.removeChild(oli);
                   if(oinput.checked){
                    totalPrice = totalPrice - parseInt(subtotal);
                    oem.innerHTML = totalPrice;
                   }
                  
                }
            }
        })

        //全选删除按钮绑定事件
        oallDelete.onclick = function (){
            var ocheckbox = document.querySelectorAll(".wrap .all-merchandise .goods .goods-item div:nth-child(1) input");
            var a =  document.querySelectorAll(".wrap .all-merchandise .goods .goods-item div:nth-child(1) input:checked").length 
            if(a>0){
                if(confirm("是否删除选中商品？")){
                
                    ocheckbox.forEach(function (item){
                        if(item.checked){
                            var oli = item.parentNode.parentNode;
                            var oul = oli.parentNode;
                            var subtotal = oli.querySelector("div:nth-child(6)").innerHTML;
                            oul.removeChild(oli);
                            totalPrice = totalPrice - parseInt(subtotal);
                            oem.innerHTML = totalPrice;

                            
                        }
                    })
                }
            }else{
                alert("暂未选中商品")

            }
            


        }



        //计算价格
        function getMoney(index,value){
            //单价对应下标
            var index = index;
            //选中上商品数量
            var num = value;
            var div4 = document.querySelectorAll(".wrap .all-merchandise .goods .goods-item div:nth-child(4)");
            var div6 = document.querySelectorAll(".wrap .all-merchandise .goods .goods-item div:nth-child(6)");
            var input = document.querySelectorAll(".wrap .all-merchandise .goods .goods-item div:nth-child(1) input");
            div6[index].innerHTML = (div4[index].innerHTML * num).toFixed(2);
            if(input[index].checked){
                totalPrice = totalPrice + parseInt(div4[index].innerHTML);
                console.log(totalPrice)
            }  
            oem.innerHTML = totalPrice;
            
        }


   }
 })