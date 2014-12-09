/*
双向循环链表数据结构
链表第一个节点作为基节点 后面添加的节点如果比基节点大则向下一步插入 如果比基节点小则向上插入
节点之间双向引用 构成一个环

在查找的时候可以根据节点的值大小决定向上查找还是向下查找 数据越多所用时间越少
*/
var twoWay=({
  head:null,// 第一个节点
  length:0,// 链表长度
  hash:{},// 每个节点的希哈表
  point:null,// 指针
  lastNode:null,
  result:null,
  init:function(){
    var that=this;
    that.result={
      data:null,
      point:null,
      length:null
    };
    return that.method();
  },
  method:function(){
    var that=this;
    return {
      add:function(key,val){
        if(that.hash[key]){
          return ;
        }
        var item=new that.item(key,val),
            currBefore,currNext;
        that.hash[key]=1;
        if(!that.head){
          that.head=item;
          that.head.next=item;
          that.head.before=item;
          that.point=that.head;
          that.length+=1;
          return;
        }
        while(true){
          if(item.value>that.head.value){
            that.point=that.head.next;// 每次进来重置指针
            currBefore=that.point.before;
            currBefore.next=item;
            item.next=that.point;
            item.before=currBefore;
            that.point.before=item;

            that.point=that.head.next;
            that.length+=1;
            that.result.data=that.head;
            that.result.point=that.point;
            that.result.length=that.length;
            return;
          }else if(item.value<that.head.value){
            that.point=that.head.before;// 每次进来重置指针
            currNext=that.point.before;
            currNext.before=item;
            item.before=that.point;
            item.next=currNext;
            that.point.next=item;

            that.point=that.head.next;
            that.length+=1;
            that.result.data=that.head;
            that.result.point=that.point;
            that.result.length=that.length;
            return;
          }else{
            return;
          }
        }
      },
      splice:function(key,val){
        if(that.hash[key]==0){
          return;
        }
        var n=that.length,
            temp=that.head,
            num=temp.value;
        if(key==temp.index){
          if(temp.next==that.point){
            that.point=temp.next.next;
          }
          var a=temp.next;// 上
          var b=temp.before;// 下
            
          a.before=b;
          b.next=a;
          that.hash[key]=0;
          that.result.data=a;
          that.result.length-=1;
          that.result.point=that.point;
          return;
        }
        
        while(n){
          if(val){
            if(val>that.head.value){
              temp=temp.next;
            }else{
              temp=temp.before;
            }
          }else{
            temp=temp.next;
          }
          if(temp.index==key&&(temp!=that.head)){
            if(temp==that.point){
              if(temp.before==that.head){
                that.point=temp.next;
              }else if(temp.next==that.point){
                that.point=temp.before;
              }
            }
            // 断开需要移除节点的相互引用
            var a=temp.next;// 上
            var b=temp.before;// 下
            a.before=b;
            b.next=a;
            that.hash[key]=0;
            that.result.length-=1;
            that.result.point=that.point;
            break;
          }
          n--;
        }
      },
      contain:function(key){
        return ((that.hash[key])?true:false);
      },
      clear:function(){
        that.head=null;
        that.length=0;
        that.hash={};
        that.point=null;
        that.result.data=null;
        that.result.length=0;
        that.result.point=null;
      },
      reads:function(){
        return (that.result);
      }
    };
  },
  item:function(index,value){
    this.index=index;
    this.value=value;
    this.next=null;
    this.before=null;
  }
}).init();


twoWay.add(3,3)
twoWay.add(1,1)
twoWay.add(2,2)
twoWay.add(4,4)
twoWay.add(5,5)
twoWay.splice(2,2)
var s=(twoWay.reads()).data;
console.log((twoWay.reads()).point);
console.log(s.value);
console.log(s.next.value);
console.log(s.next.next.value);
console.log(s.next.next.next.value);
console.log(s.next.next.next.next.value);
console.log(s.next.next.next.next.next.value);
console.log(s.next.next.next.next.next.next.value);
console.log(s.next.next.next.next.next.next.next.value);
console.log(s.next.next.next.next.next.next.next.next.value);
console.log(s.next.next.next.next.next.next.next.next.next.value);
console.log(s.next.next.next.next.next.next.next.next.next.next.value);
console.log(s.next.next.next.next.next.next.next.next.next.next.next.value);
console.log(s.next.next.next.next.next.next.next.next.next.next.next.next.value);
console.log(s.next.next.next.next.next.next.next.next.next.next.next.next.next.value);
console.log(s.next.next.next.next.next.next.next.next.next.next.next.next.next.next.value);
console.log('--------------------------------------------------------------------');
console.log(s.value);
console.log(s.before.value);
console.log(s.before.before.value);
console.log(s.before.before.before.value);
console.log(s.before.before.before.before.value);
console.log(s.before.before.before.before.before.value);
console.log(s.before.before.before.before.before.before.value);
console.log(s.before.before.before.before.before.before.before.value);
console.log(s.before.before.before.before.before.before.before.before.value);
console.log(s.before.before.before.before.before.before.before.before.before.value);
console.log(s.before.before.before.before.before.before.before.before.before.before.value);
console.log(s.before.before.before.before.before.before.before.before.before.before.before.value);
console.log(s.before.before.before.before.before.before.before.before.before.before.before.before.value);
console.log(s.before.before.before.before.before.before.before.before.before.before.before.before.before.value);
console.log(s.before.before.before.before.before.before.before.before.before.before.before.before.before.before.value);