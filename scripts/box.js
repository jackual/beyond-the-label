const dir_update = () => {
    const grid = document.getElementById("grid")
    grid.style.height = "unset"
    if (window.innerWidth > 812)
        grid.style.height = (grid.clientHeight / 2) + "px"
}

onload = () => {

    u({
        "#grid": data.map(i => {
            i.urlHost = `Open ${new URL(i.url)
                .hostname
                .replace("www.", "")
                .toLowerCase()} in new tab`

            i.mediaAuth = i.author ? [i.media, i.author].join(" | ") : i.media

            return {
                div: [
                    "mediaAuth",
                    "title",
                    "blurb",
                    "urlHost"]
                    .map(x =>
                        i[x] ? { p: i[x], class: x } : ""
                    ),
                class: "cell"
            }
        })
    })

    dir_update()

    document.querySelectorAll("#tags img").forEach(i => {
        i.addEventListener("mouseover", event => {
            event.target.classList.remove("grey")
            document.querySelectorAll("#tags img").forEach(x => {
                if (x.src != event.target.src)
                    x.classList.add("grey")
            })
        })
        i.addEventListener("mouseleave", event => {
            document.querySelectorAll("#tags img").forEach(x => {
                x.classList.remove("grey")
            })
        })
    })

    document.getElementById("tshirt").playbackRate = 3

}

onresize = () => {
    dir_update()
}