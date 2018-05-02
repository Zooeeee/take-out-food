// let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
  
function bestCharge(selectedItems) {
  //将 a*b 转化为 b 个a；
  function trans(selectedItems){
    var n  = new Array;
    for(var i = 0 ; i < selectedItems.length ; i++){
      n.push(selectedItems[i].split(" "));
    }
    var r = new Array;
    for(var i = 0 ; i <selectedItems.length ; i++){
      for(var a = 0 ;  a < n[i][2];a++)
        r.push(n[i][0]);
    }
    return r;}
//id_to_price 将id转换为price
function id_to_price(n){
  var list = loadAllItems();
  var result = new Array;
  var p ;
  for(var a = 0 ; a < n.length ; a++){
    for (var b = 0 ; b<list.length;b++){
      p = list[b].id;
      if (p == n[a])
      result.push(list[b].price);}}
 return result;
}

//求数字数组和
function sum (a){
  var sum = 0 ;
  for(var i = 0 ; i<a.length;i++)
  sum = sum + a[i];
  return sum ;
}

//将原价数组转换为半价数组并算出应付价格
function discount(a){
  var r =new Array;
  var n ;
  for(var i = 0 ; i <a.length ; i++){
    n = a[i];
    if(n == 18.00 || n == 8.00)
    n = n/2;
    r.push(n);
  }
  r = sum(r);
  return r;
}
//将原价数组算的总价，超过30-6
function reduce(a){
  var r = 0 ;
  r = sum(a);
  if (r>30)
  r = r - 6 ;
  return r ;
}
//通过id知道是对象的第几个
function find(str,obj){
for(var i = 0 ; i < obj.length ; i++)
if(str == obj[i].id)
return i ;
}

//将 id*num转化name*num=price
function tr(str,obj){
var item = str.split(" ");
var n = find(item[0],obj);
var price = obj[n].price * item[2];
var s = obj[n].name +" "+"x" +" "+ item[2]+" = "+price+"元";
return s ;
}

//总计
function end (dis_price,reduce_price){
  var n = 0 ;
  if(dis_price < reduce_price)
  n = dis_price;
  else if (dis_price > reduce_price)
  n = reduce_price;
  else if (dis_price == reduce_price)
  n = dis_price;
  var result = `总计：`+n+`元`+`\n`
  +`===================================`;
  return result;
}

//明细打印 头部  ：一条打印一个
function detail(selectedItems,obj){
  var s = ``;
  var n = new Array;
  for(var i = 0 ; i < selectedItems.length-1 ; i++){
  s = s + tr(selectedItems[i],obj) + `\n`;
  }
  s = s + tr(selectedItems[selectedItems.length-1],obj);
  var result = `============= 订餐明细 =============`+`\n`+
  s+`\n`+`-----------------------------------`+`\n`;
  return result;
  
}
// 使用优惠
function mode(dis_price,reduce_price,price){
  var result ;
  var b ;
  c = `-----------------------------------`+`\n`;
  if(dis_price < reduce_price)
  b =`使用优惠:`+`\n`+ `指定菜品半价(黄焖鸡，凉皮)，省`+(price-dis_price)+`元`+`\n`;
  else if (dis_price > reduce_price)
  b = `使用优惠:`+`\n`+`满30减6元，省`+(price-reduce_price)+`元`+`\n`;
  else if (dis_price == reduce_price)
  {b=c="";}
  return b+c;
  }

//main
var obj = loadAllItems();  //返回菜品对象
var list = trans(selectedItems);   //将 id * num 转换为 num 个 id
var pricelist = id_to_price(list);  // 将 id 数组 转换为  price 数组
price = sum(pricelist);            // 计算总价格     sum（）
dis_price = discount(pricelist);   //计算 某些半价后的价格  sum（）  
reduce_price = reduce(pricelist);  //  计算 满 30-6的价格   sum（）   
var a = detail(selectedItems,obj); // 将  id * num 打印在头部    用 tr（）将id*num转化name*num=price
var b = mode(dis_price,reduce_price,price); // 比较满减后  将 优惠方式打印在中间
var c = end(dis_price,reduce_price);      //  将最终价格打印在尾部
var result = a+b+c;
return result ;
}