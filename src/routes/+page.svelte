<script>
    import Stock from "../svg/template1.svelte"

    const padding = 3;
    const borderWidth = 1.5;

    let SelectStatus = 0;
    let SelectionFrameCurser = "normal";

    let Hover = {
        top    : 0,
        left   : 0,
        height : 0,
        width  : 0,
        z      : -99
    }

    const RemoveHover = () => {
        if (!(SelectStatus)){ 
            Hover.z = -99;
        }
    }

    // @ts-ignore
    const HoverHandler = (event) => {

        if (!(SelectStatus)){ 

            let HoveredElement = event.target.closest('*[id]:not(g):not(#A4):not(svg):not(div)');

            if (HoveredElement) {

                let PositionData = HoveredElement.getBoundingClientRect();

                Hover.top    = Math.round(PositionData.top   ) - padding - borderWidth;
                Hover.left   = Math.round(PositionData.left  ) - padding - borderWidth;
                Hover.height = Math.round(PositionData.height);
                Hover.width  = Math.round(PositionData.width );
                Hover.z      = 1;
            }
        }
    };

    // @ts-ignore
    const Selected = (event) => {
        SelectStatus = 1;
        event.stopPropagation();
    }

    const Deselected = () => {
        SelectStatus = 0;
        RemoveHover();
    }



</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<section
    class="editor"
    on:click={ Deselected }
    on:mouseover={ (event) => HoverHandler(event)}>
    
    <Stock/>

    <div
        id="intacted"
        class={ SelectStatus?"selected":"" }
        on:click={ (event) => Selected(event) }
        on:mouseout={ RemoveHover }
        style = "
            top          :{Hover.top}px;
            left         :{Hover.left}px;
            height       :{Hover.height}px;
            width        :{Hover.width}px;
            z-index      :{Hover.z};
            padding      :{padding}px;
            border-width :{borderWidth}px;
            border-radius:{padding}px;
        ">
    </div>
</section>

<style>
    
    section.editor > div#intacted {
        background-color: transparent;
        border: solid hsla(210, 15%, 50%, 0.5);
        position: absolute;
        box-sizing: content-box;
        cursor: pointer;
    }

    section.editor > div#intacted.selected {
        background-color: rgba(0, 119, 255, 0.1);
        border: solid rgb(0, 119, 255);
    }

</style>