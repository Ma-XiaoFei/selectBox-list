function SelectCheckBox(options) {
    let _this = this;
    this.el = options.el;
    let s = ` <div class="InputContainer">
    <input class="selectInput" data-id="sel" type="text" readonly>
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
            `<li class="selectLi" data-id="sel"><label data-id="sel"><input data-id="sel" class="checkBox" type="checkbox" name="${item.value}" > <span data-id="sel">${item.name}</span></label> </li>`
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
    checkBoxs.forEach(item=>{
        item.onchange = function(){
            console.log(this.parentElement)
            let isChecked = this.checked;
            isChecked ? this.parentElement.classList.add('checked') : this.parentElement.classList.remove('checked');
            if (this.value === 'allCheck'){
                checkBoxs.forEach(item=>{item.checked = isChecked});
            } else{
                checkBoxs[0].checked = checkBoxs.slice(1).every(check=>{
                    return check.checked
                })
            }
        }
    })
}
SelectCheckBox.prototype.values = function(){
    let list = [];
    Array.from(this.selectBoxContent.querySelectorAll('input[type=checkbox]')).forEach(t=>{
        if (t.checked){
            list.push(t.name)
        }
    })
    return list;
}

let demo = new SelectCheckBox({
    el: document.querySelector('.SelectXcheckBox'),
    data: [{name: '我们', value: 'm'},{name: 'sfsdf', value: 12},{name: '我们', value: 'm'},{name: 'sfsdf', value: 12},{name: '我们', value: 'm'},{name: 'sfsdf', value: 12},{name: '我们', value: 'm'},{name: 'sfsdf', value: 12}]
})
console.log(demo.values())

new SelectCheckBox({
    el: document.querySelector('.SelectXcheckBox'),
    data: [{name: '我们', value: 'm'},{name: 'sfsdf', value: 12},{name: '我们', value: 'm'},{name: 'sfsdf', value: 12},{name: '我们', value: 'm'},{name: 'sfsdf', value: 12},{name: '我们', value: 'm'},{name: 'sfsdf', value: 12}]
})



new SelectCheckBox({
    el: document.querySelector('.SelectXcheckBox'),
    data: [{name: '们dddddddddddd', value: 'm'},{name: 'sfsdf', value: 12},{name: '我们', value: 'm'},{name: 'sfsdf', value: 12},{name: '我们', value: 'm'},{name: 'sfsdf', value: 12},{name: '我们', value: 'm'},{name: 'sfsdf', value: 12}]
})