class TaskElement  {
    constructor(id, task) {
        this.id = id;
        this.showMenu = false;
        this.deleteCallback = function() {};
        this.onEditCallback = function() {};
        
        this.element = null;
        this.button = null;
        this.task = task;
        this.menu = null;

        this.createElement();
        this.initEvent();
    }

    createElement() {
        const li = document.createElement('li');
        const button = document.createElement('div');
        this.createMenu();
        this.input = document.createElement('input');
        this.input.value = this.task.value;

        li.classList.add('task');
        button.classList.add('settings');
        button.innerHTML = `<img src="./assets/icons/points.png" alt="" />`;

        const check = document.createElement('input');
        check.type = 'checkbox';
        check.checked = this.task.completed;

        check.onclick = () => {
            // console.log('updating completion')
            this.onEditCallback({
                value: this.task.value,
                completed: !this.task.completed
            })
        }
        const label = document.createElement('label');
        const labelP = document.createElement('p');
        // labelP.classList.add('checked');
        labelP.innerText = this.task.value;
        label.appendChild(check);
        label.appendChild(labelP);

        li.appendChild(label);
        li.appendChild(button);

        this.element = li;
        this.button = button;
        this.button.appendChild(this.menu);
    }

    initEvent() {
        this.button.addEventListener('click', () => {
            this.showMenu = !this.showMenu;
            if (this.showMenu) {
                this.menu.classList.remove('d-none');
            } else {
                this.menu.classList.add('d-none');
            }
        })

        this.input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
              if(this.input.value.trim()) {
                this.onEditCallback({
                    value: this.input.value.trim(),
                    completed: this.task.completed
                });
              } else {
                this.deleteCallback();
              }
            }
        })
    }

    createMenu() {
        const menu = document.createElement('ul');
        const edit = document.createElement('li');
        const deleteEl = document.createElement('li');

        menu.classList.add('task-setting');
        menu.classList.add('d-none');

        edit.innerHTML = '<img style="width: 20px;" src="./assets/icons/stylo.png" alt="">Edit';
        deleteEl.innerHTML = '<img style="width: 20px;" src="./assets/icons/bouton-supprimer.png" alt="">Delete';

        menu.appendChild(edit);
        menu.appendChild(deleteEl);

        edit.addEventListener('click', () => {
            this.element.innerHTML = '';
            this.element.appendChild(this.input);
            this.input.focus()
        })

        deleteEl.addEventListener('click', () => {
              this.deleteCallback(this.id);
        })

        this.menu = menu;
    }

    onDelete(callback) {
        this.deleteCallback = callback;
    }


    onEdit(callback) {
        this.onEditCallback = callback;
    }

}