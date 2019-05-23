!function () {
    var view = document.querySelector('section.message');
    var model = {
        // 初始化AV
        init:function () {
            var APP_ID = 'gqlmsYEe0uGOFjOWjYRi2WBM-gzGzoHsz';
            var APP_KEY = 'UyaKPM6dI0nX43h4h7F9hARa';
            AV.init({appId: APP_ID, appKey: APP_KEY});
        },
        // 获取数据
        fetch: function () {
            // 将数据库里的数据显示在页面上
            var query = new AV.Query('Message');
            return query.find(); // 返回一个Promise对象
        },
        // 创建数据
        save: function (name,content) {
            var Message = AV.Object.extend('Message');
            var message = new Message();
            return message.save({
                'name':name,
                'content': content
            }) // 返回一个Promise对象
        }
    }
    var controller = {
        view: null,
        messagesList: null,
        myForm: null,
        model:null,
        init:function (view,model) {
            this.view = view;
            this.messagesList = view.querySelector('#messagesList');
            this.myForm = view.querySelector('#postMessage');
            this.model = model;
            this.model.init();
            this.loadMessages();
            this.bindEvents();
        },
        loadMessages:function () {
            // 将数据库里的数据显示在页面上
            this.model.fetch().then((messages) => {

                messages.forEach((item)=>{
                    let li = document.createElement('li');
                    li.innerText = item.attributes.name+':'+item.attributes.content;
                    this.messagesList.appendChild(li);
                })
            }, function (error) {
                // 异常处理
            });
        },
        bindEvents:function () {
            // 向数据库中添加数据
            this.myForm.addEventListener('submit',(e)=>{
                // 阻止默认事件 form表单提交的默认事件就是刷新页面
                e.preventDefault();
                this.saveMessage();
            })
        },
        saveMessage:function () {
            let myForm = this.myForm;
            let content = myForm.querySelector('input[name=content]').value;
            let name = myForm.querySelector('input[name=name]').value;
            this.model.save(name,content).then(function(object) {
                let messagesList = document.querySelector('#messagesList');
                let li = document.createElement('li');
                li.innerText = object.attributes.name+':'+object.attributes.content
                messagesList.appendChild(li);
                myForm.querySelector('input[name=content]').value = '';
                myForm.querySelector('input[name=name]').value = '';
            })
        }
    }
    controller.init(view,model);
}.call()

        /*
          // 测试代码
          // 在LeanCloud中 创建DobbyKim表
          var DobbyKim = AV.Object.extend('DobbyKim');
          // 创建对象
          var obj = new DobbyKim();
          // 保存表的信息为 words : 'Fuck you World'
          obj.save({
              words: 'Fuck you World'
          }).then(function(object) {
              alert('LeanCloud Rocks!');
          })
          */
