	var minTop = 0;

	/*---------------从服务器访问获取数据-------------------*/
    var url = 'http://10.3.157.189:8080/mywaterfall/images/';
    window.onload = loadPageDatas;
    function loadPageDatas(){
		var script = document.createElement('script');
		script.setAttribute('src','http://10.3.157.189:8080/mywaterfall/handle.js');
		document.body.appendChild(script);		
	 }
	
	/*---------------从本地获取数据-------------------*/
	// var dataList = []; 
 //   	function addDatas(num){
 //    	for(var i=0;i<num;i++){
 //    		var str = i + '.jpg';
 //    		dataList.push(str);  		
 //    	}
 //    	return dataList;
 //    }
	// var data = addDatas(36);	
 //   	window.onload =waterfall;

 /* -------------------------------------*/
   	window.onscroll = isloadPage;

    function isloadPage(){//判断
        if(checkscrollside()){
        	loadPageDatas();
        	//waterfall();
        };
    }

    function checkscrollside(){//设置指定高度-最低列minTop，到达则返回true
        var oParent=document.getElementById('container');
        var ablock=getClassObj(oParent,'block');
        var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
        var documentView=document.documentElement.clientHeight;//视窗高度
        return (minTop<scrollTop+documentView)?true:false;
    }

    function getClassObj(parent,className){//获取parent下子元素为className的数组
        //var obj=parent.getElementsByTagName('*');//获取父级的所有子集
        var obj = parent.getElementsByClassName(className);
        var blockS=[];
        for (var i=0;i<obj.length;i++) {//遍历子元素、判断类别、压入数组
            //if (obj[i].className==className){
                blockS.push(obj[i]);
           // }
        };
        return blockS;
    }

    function getminHIndex(arr,minH){//返回arr中最小高度的索引index
        for(var i in arr){
            if(arr[i]==minH){
                return i;
            }
        }
    }

	function waterfall(data){
	    var oParent=document.getElementById('container');
	    for(var i=0;i<data.length;i++){
	        var oblock=document.createElement('div'); 
	        oblock.className='block';                  
	        oParent.appendChild(oblock);            
	        var oBox=document.createElement('div');
	        oBox.className='box';
	        oblock.appendChild(oBox);
	        var oImg=document.createElement('img');
	        //oImg.src='../images/'+data[i];
	        
	        oImg.src=url + data[i];//后台数据
	        oBox.appendChild(oImg);
	    }
	    var oblock = document.getElementsByClassName('block');
	    var oBox = document.getElementsByClassName('box');
	    var oImg = document.getElementsByTagName('img');
	    var ablock=getClassObj(oParent,'block');// 获取存储块框block的数组ablock
	    var iblockW=ablock[0].offsetWidth;
	    var num=Math.floor(document.body.clientWidth/iblockW);	//documentElement
	    var blockHArr=[];
	    for(var i=0;i<ablock.length;i++){//遍历数组ablock的每个块框元素
	        var blockH=ablock[i].offsetHeight;
	        if(i<num){
	            blockHArr[i]=blockH; 
	        }else{
	            var minH=Math.min.apply(null,blockHArr);//数组blockHArr中最小值minH
	            var maxH=Math.max.apply(null,blockHArr);
	            var minHIndex=getminHIndex(blockHArr,minH);//minH->index
	            minTop = minH;
	            ablock[i].style.position='absolute';//设置绝对位移
	            ablock[i].style.top=minH+'px';
	            ablock[i].style.left=ablock[minHIndex].offsetLeft+'px';
	            blockHArr[minHIndex]+=ablock[i].offsetHeight;//更新添加了容器后的列高blockHArr
	        }
	    }
	    oParent.style.cssText = 'width: '+iblockW*num+'px;height: '+maxH+'px;background-color: rgba(180,210,220,.5);padding: 0 20px;';
	}

    

