const SVG = document.querySelector('#canvas');
const text_content = document.querySelector('#text-content');
const font_size = document.querySelector('#font-size');
const letter_spacing = document.querySelector('#letter-spacing');
const font_color = document.querySelector('#font-color');
const fill_color = document.querySelector('#fill-color');
const element_text = document.querySelector("#element-text")
const element_name = document.querySelector("#element-name")
const delete_btn = document.querySelector("#delete-btn")
const image_upload = document.querySelector("#image-upload")
const transform_scale = document.querySelector("#transform-scale")
const x = document.querySelector("#x-pos")
const y = document.querySelector("#y-pos")
const hr = document.querySelectorAll("hr")
const floating_start = document.querySelector("#floating-start")
const select_box = document.querySelector('#select-box')

let currentElement = null;
let styles = {}

// console.log("init okay")

function SVG_force_refresh() {
    SVG.innerHTML += ""

    const fake_ele = document.createElement("circle")
    SVG.appendChild(fake_ele)

    fake_ele.remove()
}

function DarkMode_on() {
    document.body.setAttribute("data-darkmode", "true")
    document.querySelectorAll(".icons").forEach(icon => {
        icon.setAttribute("style", "fill:#f2f2f2")
    });
    document.querySelector("#darkmodebtn > span").textContent = "Switch to Light Mode"
    document.querySelector("#darkmodebtn > svg").innerHTML = `
    <path style="fill:#f2f2f2" class="icons"
    d="M480-371q45.456 0 77.228-31.772Q589-434.544 589-480q0-45.456-31.772-77.228Q525.456-589 480-589q-45.456 0-77.228 31.772Q371-525.456 371-480q0 45.456 31.772 77.228Q434.544-371 480-371Zm0 91q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM80-434.5q-19.152 0-32.326-13.174T34.5-480q0-19.152 13.174-32.326T80-525.5h80q19.152 0 32.326 13.174T205.5-480q0 19.152-13.174 32.326T160-434.5H80Zm720 0q-19.152 0-32.326-13.174T754.5-480q0-19.152 13.174-32.326T800-525.5h80q19.152 0 32.326 13.174T925.5-480q0 19.152-13.174 32.326T880-434.5h-80Zm-320-320q-19.152 0-32.326-13.174T434.5-800v-80q0-19.152 13.174-32.326T480-925.5q19.152 0 32.326 13.174T525.5-880v80q0 19.152-13.174 32.326T480-754.5Zm0 720q-19.152 0-32.326-13.174T434.5-80v-80q0-19.152 13.174-32.326T480-205.5q19.152 0 32.326 13.174T525.5-160v80q0 19.152-13.174 32.326T480-34.5ZM222.174-673.935l-43-42Q165.5-728.609 166-747.761t13.174-33.065q13.435-13.674 32.587-13.674t32.065 13.674l42.239 43q12.674 13.435 12.555 31.706-.12 18.272-12.555 31.946-12.674 13.674-31.445 13.413-18.772-.261-32.446-13.174Zm494 494.761-42.239-43q-12.674-13.435-12.674-32.087t12.674-31.565Q686.609-299.5 705.38-299q18.772.5 32.446 13.174l43 41.761Q794.5-231.391 794-212.239t-13.174 33.065Q767.391-165.5 748.239-165.5t-32.065-13.674Zm-42-494.761Q660.5-686.609 661-705.38q.5-18.772 13.174-32.446l41.761-43Q728.609-794.5 747.761-794t33.065 13.174q13.674 13.435 13.674 32.587t-13.674 32.065l-43 42.239q-13.435 12.674-31.706 12.555-18.272-.12-31.946-12.555Zm-495 494.761Q165.5-192.609 165.5-211.761t13.674-32.065l43-42.239q13.435-12.674 32.087-12.674t31.565 12.674Q299.5-273.391 299-254.62q-.5 18.772-13.174 32.446l-41.761 43Q231.391-165.5 212.239-166t-33.065-13.174ZM480-480Z" />
    `
}

function DarkMode_off() {
    document.body.setAttribute("data-darkmode", "false")
    document.querySelectorAll(".icons").forEach(icon => {
        icon.setAttribute("style", "fill:#0D0D0D")
    });
    document.querySelector("#darkmodebtn > span").textContent = "Switch to Dark Mode"
    document.querySelector("#darkmodebtn > svg").innerHTML = `
    <path style="fill:#0D0D0D" class="icons"
    d="M480.239-116.413q-153.63 0-258.728-104.978Q116.413-326.37 116.413-480q0-133.935 84.739-235.435t223.304-123.043q15.392-3.435 27.544 1.348 12.152 4.782 19.945 14.021 7.794 9.239 9.609 22.196 1.816 12.956-4.75 26.109-13.891 25.043-21.315 51.652-7.424 26.608-7.424 55.5 0 91.694 64.326 155.879 64.325 64.186 156.218 64.186 28.369 0 56.478-7.446 28.109-7.445 50.913-20.576 12.913-5.804 25.13-4.108 12.218 1.695 21.105 8.13 9.874 6.435 14.656 18.229 4.783 11.793 1.587 27.945Q820.174-291 717.63-203.706q-102.543 87.293-237.391 87.293Zm0-91q81.783 0 147.837-43.717 66.054-43.718 98.293-114.783-17.608 4.044-35.097 6.326-17.49 2.283-34.859 1.805-122.043-4.066-207.946-89.37-85.902-85.304-90.445-209.261-.24-17.369 1.923-34.978 2.164-17.609 6.446-34.978-70.826 32.478-114.782 98.652Q207.652-561.543 207.652-480q0 112.929 79.829 192.758 79.829 79.829 192.758 79.829ZM467.13-466.891Z"/>
    `
}

document.querySelector("#darkmodebtn").addEventListener("click", () => {
    if (document.body.getAttribute("data-darkmode") == "true") {
        DarkMode_off()
    } else {
        DarkMode_on()
    }
});

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    DarkMode_on()
}

// console.log("dark mode okay")

function inlineStylesToObject(element) {
    const style = element.getAttribute('style');
    styles = {};
    style.split(';').forEach(rule => {
        if (rule) {
            const [name, value] = rule.trim().split(':');
            styles[name.trim()] = value.trim();
        }
    });

    return styles;
}

function objectToInlineStyles(element) {
    let inlineStyles = "";

    for (const property in styles) {
        inlineStyles += `${property}:${styles[property]};`;
    }

    element.setAttribute('style', inlineStyles)
}

function syncAside(element) {

    // console.log(element)

    if (floating_start) {
        floating_start.remove()
    }

    element_text.setAttribute("data-hide", false)
    element_name.setAttribute("data-hide", false)
    delete_btn.setAttribute("data-hide", false)

    x.removeAttribute("readonly")
    y.removeAttribute("readonly")

    x.value = element.getAttribute('x')
    y.value = element.getAttribute('y')

    hr.forEach(hr_tag => {
        hr_tag.setAttribute("data-hide", false)
    });

    // reset styles
    if (element.tagName != 'image') {
        styles = inlineStylesToObject(element)
    }

    // reset all value
    font_size.value = ''
    // styles_content.value = ''

    // element heading
    element_name.textContent = `${element.id}`

    // Text Element
    if (element.tagName == 'text') {
        text_content.removeAttribute("readonly")
        font_size.removeAttribute("readonly")
        letter_spacing.removeAttribute("readonly")
        font_color.removeAttribute("readonly")
        fill_color.setAttribute("readonly", true)
        image_upload.setAttribute("readonly", true)
        transform_scale.setAttribute("readonly", true)
    }

    // Rect Element
    if (element.tagName == 'rect') {
        text_content.setAttribute("readonly", true)
        font_size.setAttribute("readonly", true)
        letter_spacing.setAttribute("readonly", true)
        font_color.setAttribute("readonly", true)
        fill_color.removeAttribute("readonly")
        if (element.id.includes("-placeholder")){
            image_upload.removeAttribute("readonly")
        } else {
            image_upload.setAttribute("readonly", true)
        }
        transform_scale.setAttribute("readonly", true)
    }

    // Path Element
    if (element.tagName == 'path') {

        x.setAttribute("readonly", true)
        y.setAttribute("readonly", true)

        text_content.setAttribute("readonly", true)
        font_size.setAttribute("readonly", true)
        letter_spacing.setAttribute("readonly", true)
        font_color.setAttribute("readonly", true)

        fill_color.removeAttribute("readonly")

        image_upload.setAttribute("readonly", true)
        transform_scale.setAttribute("readonly", true)
    }

    if (element.tagName == "image") {
        text_content.setAttribute("readonly", true)
        font_size.setAttribute("readonly", true)
        fill_color.setAttribute("readonly", true)
        letter_spacing.setAttribute("readonly", true)
        font_color.setAttribute("readonly", true)

        image_upload.removeAttribute("readonly")
        transform_scale.removeAttribute("readonly")

    }

    text_content.value = element.textContent;

    if (styles['font-size']) {
        font_size.value = styles['font-size'].replace('px', '')
    }

    if (styles['letter-spacing']) {
        letter_spacing.value = styles['letter-spacing'].replace('px', '')
    }

    if (styles['fill']) {
        font_color.value = styles['fill']
        fill_color.value = styles['fill']
    }

    if (element.getAttribute('transform')) {
        transform_scale.value = parseFloat(element.getAttribute('transform').replace(')','').replace('scale(','')) * 100
    }

    currentElement = element;

    mark_object_selected()

}

function emptyAside() {
    readonly_elements = [
        x,
        y,
        text_content,
        font_size,
        letter_spacing,
        font_color,
        fill_color,
        image_upload
    ]

    data_hide_elements = [
        delete_btn,
        element_name,
        element_text
    ]

    data_hide_elements.push(...hr)

    readonly_elements.forEach(element => {
        element.setAttribute("readonly", true)
    });

    data_hide_elements.forEach(element => {
        element.setAttribute("data-hide", true)
    });
}

function sync_pos() {
    if (currentElement) {
        currentElement.setAttribute('x', x.value)
        currentElement.setAttribute('y', y.value)
        mark_object_selected()
    }
}

function sync_text_content() {
    if (currentElement) {
        currentElement.textContent = text_content.value;
        mark_object_selected()
    }
}

function sync_font_size() {
    if (currentElement) {
        styles['font-size'] = `${font_size.value}px`;
        objectToInlineStyles(currentElement)
        mark_object_selected()
    }
}

function sync_letter_spacing() {
    if (currentElement) {
        styles['letter-spacing'] = `${letter_spacing.value}px`;
        objectToInlineStyles(currentElement)
        mark_object_selected()
    }
}

function sync_font_color() {
    if (currentElement) {
        styles['fill'] = `${font_color.value}`;
        objectToInlineStyles(currentElement)
        
    }
}

function sync_fill_color() {
    if (currentElement) {
        styles['fill'] = `${fill_color.value}`;
        objectToInlineStyles(currentElement)
    }
}

function sync_transform_scale() {
    if (currentElement) {

        const org_scale = parseFloat(currentElement.getAttribute('transform').replace(')','').replace('scale(',''))
        const new_scale = transform_scale.value / 100

        const x = parseFloat(currentElement.getAttribute('x'))
        const y = parseFloat(currentElement.getAttribute('y'))

        const width = parseFloat(currentElement.getAttribute('width'))
        const height = parseFloat(currentElement.getAttribute('height'))

        currentElement.setAttribute('transform', `scale(${new_scale})`)

        currentElement.setAttribute('x', x + ( ( org_scale - new_scale ) * width  / 1.5 ))
        currentElement.setAttribute('y', y + ( ( org_scale - new_scale ) * height / 1.5 ))

        mark_object_selected()
    }
}

function sync_pic(event) {

    // transform="scale(1.1)"

    if (currentElement){
        const file = event.target.files[0];
        const img_ele = document.createElement("image")

        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                
                const img = new Image();
 
                // img.src = event.target.result;

                img.onload = () => {

                    // console.log('hi')

                    let height = 0
                    let width = 0

                    let org_height = 0
                    let org_width = 0

                    if (currentElement.getAttribute("data-org-height")) {
                        org_height = parseFloat( currentElement.getAttribute("data-org-height"))
                        org_width  = parseFloat( currentElement.getAttribute("data-org-width" ))
                    } else {
                        org_height = parseFloat( currentElement.getAttribute("height"))
                        org_width  = parseFloat( currentElement.getAttribute("width" ))
                    }

                    const img_aspect_ratio = img.width / img.height
                    
                    if ( (img_aspect_ratio * org_height) < org_width ) {
                        // console.log('height_referenced_image')
                        height = org_height
                        width = img_aspect_ratio * org_height
                    } else {
                        width = org_width
                        height = org_width / img_aspect_ratio
                    }

                    const x_offset = ( parseFloat( currentElement.getAttribute("width" )) - width  ) / 2
                    const y_offset = ( parseFloat( currentElement.getAttribute("height")) - height ) / 2

                    

                    img_ele.setAttribute("xlink:href", event.target.result)
                    img_ele.setAttribute("height", height)
                    img_ele.setAttribute("width", width)
                    img_ele.setAttribute("data-org-height", org_height )
                    img_ele.setAttribute("data-org-width",  org_width  )
                    img_ele.setAttribute("x", parseFloat(currentElement.getAttribute("x")) + x_offset)
                    img_ele.setAttribute("y", parseFloat(currentElement.getAttribute("y")) + y_offset)
                    img_ele.setAttribute("preserveAspectRatio","none")
                    img_ele.setAttribute("transform", "scale(1)")

                    img_ele.id = currentElement.id.replace("-placeholder","")

                    currentElement.replaceWith(img_ele)

                    unmark_object_selected()

                    emptyAside()

                    SVG_force_refresh()
                }
                img.src = event.target.result;
            }

            reader.readAsDataURL(file);

        } else {
            img_ele.src = ''
        }
    }
}

function mark_object_selected(){
    if (currentElement) {
        padding = 4
        position = currentElement.getBoundingClientRect();

        select_box.animate({
            top: `${position['top'] - padding}px`,
            left:`${position['left'] - padding}px`,
            height:`${position['height']}px`,
            width:`${position['width']}px`,
            padding: `${padding}px`
        } , {duration: 150, fill: "forwards"}) 
        
    }
}

function unmark_object_selected(){
    select_box.animate({
        top: `0px`,
        left:`0px`,
        height:`0px`,
        width:`0px`,
        padding: `0px`
    } , {duration: 0, fill: "forwards"}) 

    select_box.removeAttribute('style')

}

SVG.addEventListener("mouseover", (event) => {
    const target = event.target.closest('*[id]:not(g):not(#A4):not(svg):not(div)');

    if (target) {
        target.setAttribute("data-hover", true)
    }

});

SVG.addEventListener("mouseout", (event) => {
    const target = event.target.closest('*[id]:not(g):not(#A4):not(svg):not(div)');

    if (target) {
        target.setAttribute("data-hover", false)
    }

});

SVG.addEventListener("click", (event) => {
    const target = event.target.closest('*[id]:not(g):not(#A4):not(svg):not(div)');

    if (target) {
        syncAside(target);
    }
});


text_content.addEventListener("input", sync_text_content);
font_size.addEventListener("input", sync_font_size);
letter_spacing.addEventListener("input", sync_letter_spacing);
font_color.addEventListener("input", sync_font_color);
fill_color.addEventListener("input", sync_fill_color);
x.addEventListener("input", sync_pos);
y.addEventListener("input", sync_pos);
image_upload.addEventListener("input", sync_pic)
transform_scale.addEventListener("input", sync_transform_scale)

window.onresize = mark_object_selected

delete_btn.addEventListener("click", () => {
    if (currentElement){
        currentElement.remove()
    }

    currentElement = null;

    unmark_object_selected()

    emptyAside()

})

