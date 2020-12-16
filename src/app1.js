import "./app1.css"
import $ from "jquery"

const eventBus = $(window)
// 数据相关放到m
const m = {
    // 初始化数据
    data: {
        n: parseInt(localStorage.getItem("n"))
    },
    create() {

    },
    delete() {

    },
    update(data) {
        Object.assign(m.data, data)
        eventBus.trigger('m:updated')
        localStorage.setItem('n', m.data.n)
    }
}

// 视觉相关的放到v
const v = {
    // 初始化HTML
    el: null,
    html: `
        <div>
            <div class="output">
                <span id="number">{{n}}</span>
            </div>
            <div class="actions">
                <button id="add1"> +1 </button>
                <button id="minus1"> -1 </button>
                <button id="mul2"> *2 </button>
                <button id="divide2"> /2 </button>
            </div>
        </div>
`,
    init(container, n) {
        v.el = $(container)

    },
    render(n) {
        if (v.el.children.length === 0) {} else {
            v.el.empty()
        }
        $(v.html.replace('{{n}}', n)).appendTo(v.el)
    },

}

// 其他放到c
const c = {
    // 寻找重要的元素
    init(container) {
        v.init(container)
        v.render(m.data.n)
        c.autoBindEvents()
        eventBus.on('m:updated', () => {
            v.render(m.data.n)
        })
    },
    events: {
        'click #add1': 'add',
        'click #minus1': 'minus',
        'click #mul2': 'mul',
        'click #divide2': 'div'
    },
    add() {
        m.update({
            n: m.data.n += 1
        })
    },
    minus() {
        m.update({
            n: m.data.n -= 1
        })
    },
    mul() {
        m.update({
            n: m.data.n *= 2
        })
    },
    div() {
        m.update({
            n: m.data.n /= 2
        })
    },
    autoBindEvents() {
        for (let key in c.events) {
            const spaceIndex = key.indexOf(' ')
            const part1 = key.slice(0, spaceIndex)
            const part2 = key.slice(spaceIndex + 1)
            v.el.on(part1, part2, c[c.events[key]])
        }
    }
}

export default c