function SelectCheckBox(options) {
    let _this = this;
    this.el = options.el;
    let s = ` <div class="InputContainer">
    <input style="padding-right:35px" class="selectInput" data-id="sel" type="text" readonly>
    </div>
    <svg style="width: 35px;
    height: 30px;
    position: absolute;
    right: 0;top: 0;" t="1590400200277" class="icon" viewBox="0 0 1024 1024" version="1.1"
    xmlns="http://www.w3.org/2000/svg" p-id="3796" width="200" height="200">
    <path
        d="M857.6 364.8c-12.8-12.8-32-19.2-44.8-6.4L512 601.6 211.2 358.4c-12.8-12.8-32-6.4-44.8 6.4-12.8 12.8-6.4 32 6.4 44.8L512 678.4l339.2-268.8c12.8-12.8 19.2-32 6.4-44.8z"
        fill="#bfbfbf" p-id="3797"></path>
    </svg>`;
    this.el.innerHTML = s;
    let str =
        `<div><label data-id="sel"><input type="checkbox" value="allCheck" class="allCheck" data-id="sel"> <span data-id="sel" style="color: red;">全选</span></label></div><ul>`;
    
    for (const item of options.data) {
        if (item instanceof Object){
            str +=
            `<li class="selectLi" data-id="sel"><label data-id="sel"><input data-id="sel" class="checkBox" type="checkbox" name="${item.name}" value="${item.value}" > <span data-id="sel">${item.name}</span></label> </li>`
        }
    }
       

    str += '</ul>'
    this.selectBoxContent = document.createElement('div');
    this.selectBoxContent.className = 'selectBoxContent';
    let div = document.createElement('div');
    div.innerHTML = str;
    this.selectBoxContent.appendChild(div)
    this.el.appendChild(this.selectBoxContent);
    document.getElementsByClassName('selectInput')[0].onfocus = function () {
        _this.selectBoxContent.style.display = 'block'
    }
    document.onclick = function (e) {
        if (e.target.getAttribute('data-id') !== 'sel') {
            _this.selectBoxContent.style.display = 'none'
        }
    }
    let checkBoxs = Array.from(_this.el.querySelectorAll('input[type=checkbox]'));
    this.checkedList = [];
    checkBoxs.forEach(item=>{
        item.onchange = function(){
            let isChecked = this.checked;
            isChecked ? this.parentElement.classList.add('checked') : this.parentElement.classList.remove('checked');
            if (this.value === 'allCheck'){
                if(isChecked){
                    checkBoxs.slice(1).forEach(item=>{
                        item.parentElement.classList.add('checked');
                        _this.checkedList.indexOf(item.name) === -1 ? _this.checkedList.push(item.name) : '';
                    })
                } else{
                    checkBoxs.slice(1).forEach(item=>{
                        item.parentElement.classList.remove('checked');
                    })
                    _this.checkedList = [];
                }
                checkBoxs.forEach(item=>{
                    item.checked = isChecked; 
                });
            } else{
                if (this.name){
                    isChecked ? _this.checkedList.push(this.name):_this.checkedList.splice(_this.checkedList.indexOf(this.name), 1);
                }
                checkBoxs[0].checked = checkBoxs.slice(1).every(check=>{
                    return check.checked
                })
            }
            document.getElementsByClassName('selectInput')[0].value = _this.checkedList
            options.onChange(_this.values())
        }
    })
}
SelectCheckBox.prototype.values = function(){
    let list = [];
    Array.from(this.selectBoxContent.querySelectorAll('input[type=checkbox]')).slice(1).forEach(t=>{
        if (t.checked){
            list.push(t.name)
        }
    })
    return list;
}