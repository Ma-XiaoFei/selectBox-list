/* eslint-disable */
function SelectCheckBox(options) {
    let _this = this;
    this.el = options.el;
    let s = ` <div class="InputContainer">
    <input placeholder="请选择" style="padding:6px 35px 6px 10px" class="selectInput" data-id="sel" type="text" readonly>
    </div>
    <svg style="width: 25px;
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
    this.el.getElementsByClassName('selectInput')[0].onfocus = function () {
        _this.selectBoxContent.style.display = 'block'
    }
    document.onclick = function (e) {
        if (e.target.getAttribute('data-id') !== 'sel') {
            Array.from(document.getElementsByClassName('selectBoxContent')).forEach(item=>{
                item.style.display = 'none';
            })
        }
    }
    let checkBoxs = Array.from(_this.el.querySelectorAll('input[type=checkbox]'));
    this.checkedList = [];
    this.checkedValList = [];
    checkBoxs.forEach(item=>{
        item.onchange = function(){
            let isChecked = this.checked;
            isChecked ? this.parentElement.classList.add('checked') : this.parentElement.classList.remove('checked');
            if (this.value === 'allCheck'){
                if(isChecked){
                    checkBoxs.slice(1).forEach(item=>{
                        item.parentElement.classList.add('checked');
                        _this.checkedList.indexOf(item.name) === -1 ? _this.checkedList.push(item.name) : '';
                        _this.checkedValList.indexOf(item.value) === -1 ? _this.checkedValList.push(item.value) : '';
                    })
                    _this.el.getElementsByClassName('selectInput')[0].setAttribute('data-value', _this.checkedValList.toString());
                } else{
                    checkBoxs.slice(1).forEach(item=>{
                        item.parentElement.classList.remove('checked');
                    })
                    _this.checkedList = [];
                    _this.checkedValList = [];
                    _this.el.getElementsByClassName('selectInput')[0].setAttribute('data-value', '');
                }
                checkBoxs.forEach(item=>{
                    item.checked = isChecked; 
                });
            } else{
                if (this.name){
                    isChecked ? _this.checkedList.push(this.name):_this.checkedList.splice(_this.checkedList.indexOf(this.name), 1);
                    isChecked ? _this.checkedValList.push(this.value):_this.checkedValList.splice(_this.checkedValList.indexOf(this.value), 1);
                    _this.el.getElementsByClassName('selectInput')[0].setAttribute('data-value', _this.checkedValList.toString());
                }
                let isAllChecked = checkBoxs.slice(1).every(check => {
                    return check.checked;
                });
                checkBoxs[0].checked = isAllChecked;
                isAllChecked ? checkBoxs[0].parentElement.classList.add('checked'):checkBoxs[0].parentElement.classList.remove('checked')
            }
           _this.el.getElementsByClassName('selectInput')[0].value = _this.checkedList
            options.onChange && options.onChange(_this.values())
        }
    })
}
SelectCheckBox.prototype.values = function(){
    let list = [];
    Array.from(this.selectBoxContent.querySelectorAll('input[type=checkbox]')).slice(1).forEach(t=>{
        if (t.checked){
            list.push({value:t.value,name:t.name})
        }
    })
    return list;
}
SelectCheckBox.prototype.checkeds = function(){
    let list = [];
    Array.from(this.selectBoxContent.querySelectorAll('input[type=checkbox]')).slice(1).forEach(t=>{
        if (t.checked){
            list.push(t.value)
        }
    })
    return list;
}