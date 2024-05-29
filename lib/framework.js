const append = (parent, child, exit) => {
    const type = input => ({})
        .toString
        .call(input)
        .match(/\s([a-zA-Z]+)/)[1]
        .slice(0, 1)
    switch (type(child)) {
        case "A":
            child.forEach(i => {
                append(parent, i)
            })
            break
        case "H":
            parent.appendChild(child)
            break
        case "S":
        case "N":
            parent.appendChild(document.createTextNode(child))
            break
        case "O":
            parent.appendChild(make(child))
            break
    }
    if (exit) return
    else return parent
}

const make = short => {
    let proc = Object.entries(short),
        shift = proc.shift(),
        obj = {
            tag: shift[0],
            child: shift[1],
            props: Object.fromEntries(proc)
        }
    let element = document.createElement(obj.tag)
    if (obj.props)
        Object.entries(obj.props).forEach(i => {
            element.setAttribute(...i)
        })
    if (obj.child)
        element = append(element, obj.child)

    return element
}

const u = obj => {
    Object.entries(obj).forEach(itr => {
        document.querySelectorAll(itr[0]).forEach(parent => {
            parent.replaceChildren()
            append(parent, itr[1], true)
        })
    })
}