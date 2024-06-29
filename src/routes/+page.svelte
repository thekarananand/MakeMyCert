<script>
    import Stock from "../svg/template1.svelte"

    const padding = 4;
    const borderWidth = 1.5;

    let Click = {
        top    : 0,
        left   : 0,
        height : 0,
        width  : 0,
        z      : -99
    };

    let Hover = {
        top    : 0,
        left   : 0,
        height : 0,
        width  : 0,
        z      : -99
    }

    const RemoveHover = () => { Hover.z = -99; }

    // @ts-ignore
    const HoverHandler = (event) => {

        let HoveredElement = event.target.closest('*[id]:not(g):not(#A4):not(svg):not(div)');

        if (HoveredElement) {

            let PositionData = HoveredElement.getBoundingClientRect();

            Hover.top    = Math.round(PositionData.top   ) - padding - borderWidth;
            Hover.left   = Math.round(PositionData.left  ) - padding - borderWidth;
            Hover.height = Math.round(PositionData.height);
            Hover.width  = Math.round(PositionData.width );
            Hover.z      = 1;
        }
    };

    const ClickHandler = () => {
        Click = structuredClone(Hover);
        RemoveHover();
    };



</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<section
    class="editor"
    on:mouseover={ (event) => HoverHandler(event)}>
    
    <Stock/>

    <div 
        id="selected"
        style = "
            top          :{Click.top}px;
            left         :{Click.left}px;
            height       :{Click.height}px;
            width        :{Click.width}px;
            z-index      :{Click.z};
            padding      :{padding}px;
            border-width :{borderWidth}px;
            border-radius:{padding}px;
        ">
    </div>

    <div
        id="intacted"
        on:click={ ClickHandler }
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
    
    section.editor > div#selected {
        background-color: rgba(0, 119, 255, 0.1);
        border: solid rgb(0, 119, 255);
        position: absolute;
        box-sizing: content-box;
    }

    section.editor > div#intacted {
        border: solid hsla(210, 15%, 50%, 0.5);
        position: absolute;
        box-sizing: content-box;
        cursor: pointer;
    }

</style>