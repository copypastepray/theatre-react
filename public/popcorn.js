/**
 * @popcorn-tour v1.0.0 - MIT License
 */
import {tour, kernels} from './kernels.js'
function initPopcornTour($){
    buildStyles(tour)
    let startEl = null
    // set cnt from LS or default to start (1)
    let cnt = null
    window.localStorage.getItem('pct_step') ? cnt = parseInt(window.localStorage.getItem('pct_step'),10) : null
    // What element starts the show?
    if(tour.startEl.length > 0){
        const startEl = $(tour.startEl) // Manual: e.g. click start button
        const event = tour.startEvent ? tour.startEvent : 'click'
        startEl ? startEl.addEventListener(event,function(){pct_show(1)}) : pct_show(cnt)
    }
    // continue on page load even if we have a start button
    if(cnt > 1){
        pct_show(cnt)
    }    
}

window.pct_show = function(cnt, action = null) {
    const kernel = kernels[cnt-1]
    const urlChanged = goTo(kernel?.url)
    if(kernel?.el){
        const el = $(kernel.el)
        let hideCnt = cnt
        if(action=='back'){ pct_hide(hideCnt++,action) }
        if(action=='next'){ pct_hide(hideCnt++,action) }
        if(!urlChanged){
            buildTooltip(tour,cnt,el,kernel)
            $(`#pct_tooltip${cnt}`).setAttribute('data-show', '')
        }
        el ? el.classList.add("pct_hl") : null
        window.localStorage.setItem('pct_step',cnt)
    }
}

window.pct_hide = function(cnt, action = null) {
    window.localStorage.setItem('pct_step',cnt)
    action=='back' ? cnt++ : null
    action=='next' ? cnt-- : null
    showLog('hide me: ',cnt)
    $(`#pct_tooltip${cnt}`).removeAttribute('data-show');
    $(kernels[cnt-1].el).classList.remove("pct_hl")
}

window.pct_exit = function(cnt){
    $(`#pct_tooltip${cnt}`).removeAttribute('data-show');
    $(kernels[cnt-1].el).classList.remove("pct_hl")
    window.localStorage.removeItem('pct_step')
}

function goTo(url){
    url && url!== window.location.pathname ? window.location.href = url : null
    return url && url!== window.location.pathname
}

// Build functions create HTML and fill them dynamically with contents
function buildTooltip(tour,cnt,el,kernel){
    showLog('build tt: ',cnt)
    tour.highlightColor !== null && tour.highlightColor.length > 0  ? buildHighlight(tour.highlightColor) : null
    let ttWrap = document.createElement('div')
    ttWrap.id = `pct_tooltip${cnt}`
    ttWrap.name = `pct_tooltip${cnt}`
    ttWrap.className = `pct_tooltip`
    let wCSS = '', hCSS = ''
    if(kernel.width){wCSS = `width: ${kernel.width};`}else{wCSS = ``}
    if(kernel.height){hCSS = `min-height: ${kernel.height};`}else{hCSS = ``}
    ttWrap.setAttribute('style',`${wCSS} ${hCSS}`)
    ttWrap.innerHTML = buildHeader(cnt, kernel.title) + buildContent(kernel) + buildFooter(tour,cnt) + buildArrow()
    document.body.appendChild(ttWrap)
    const tooltip = $(`#pct_tooltip${cnt}`)
    Popper.createPopper(el, tooltip, { placement: `${kernel.loc}`,modifiers: [{name: 'offset',options: {offset: [0, 8],}}] }).update()
    tooltip.setAttribute('data-show', '');
};

function buildHighlight(hlcolor){
    if(hlcolor && /^#[0-9A-F]{6}$/i.test(hlcolor)){
    let hlStyle = document.createElement('style')
    hlStyle.innerHTML = `.pct_hl{border: 3px solid ${hlcolor} !important; box-shadow: 0 0 10px ${hlcolor} !important;}`
    document.head.appendChild(hlStyle)
    }
};

function buildHeader(cnt, ktitle){
    let ttHead = `<div class="pct_header">`
    ttHead += `<h2 class="pct_title">${ktitle}</h2>`
    if(tour.ttOptions.hasClose){ ttHead += `<span class="pct_close" onclick="pct_exit(${cnt})">X</span>` }
    ttHead += `</div>`
    return ttHead
};

function buildContent(kernel){
    let wCSS = '', hCSS = '', maxWCSS, maxHCSS
    let ttCont = ``
    ttCont += `<div class="pct_content"` 
    ttCont += ` style="`
    if(kernel.width){wCSS = `width: ${kernel.width};`}else{wCSS = ``}
    if(kernel.height){hCSS = `min-height: ${kernel.height};`}else{hCSS = ``}
    if(kernel.maxWidth){maxWCSS = `max-width: ${kernel.maxWidth};`}else{maxWCSS = ``}
    if(kernel.maxHeight){maxHCSS = `max-height: ${kernel.maxHeight};`}else{maxHCSS = ``}
    ttCont += `${wCSS} ${hCSS} ${maxWCSS} ${maxHCSS}">`
    ttCont += `${kernel.content.trim()}`
    ttCont += `</div>`
    return ttCont
};

function buildFooter(tour,cnt){
    const klen = kernels.length
    let ttFoot = `<div class="pct_footer">`
    ttFoot += `<div class="pct_actions">`
    let showBackBtnClass = '' 
    if(cnt === 1){ showBackBtnClass = 'invis' }
    ttFoot += `<button class="pct_btn pct_back ${showBackBtnClass}" onclick="pct_show(${cnt - 1},'back')">&laquo; Back</button>`
    if(tour.ttOptions.hasStepCount){ttFoot  += `<span class="pct_step_cnt">${cnt} of ${klen}</span>`}
    if(cnt === klen && tour.ttOptions.hasExit!==false){
        ttFoot += `<button class="pct_btn pct_exit" onclick="pct_exit(${cnt})">Exit</button>`
    }else if(cnt === klen && tour.ttOptions.hasExit===false){
        ttFoot += `<button class="pct_btn pct_exit invis">Exit</button>`
    }else{
        // If not exit, display next button
        ttFoot += `<button class="pct_btn pct_next" onclick="pct_show(${cnt + 1},'next')">Next &raquo;</button>`
    }
    ttFoot  += `</div>` 
    ttFoot  += `</div>`
    return ttFoot
};

function buildArrow(){
    return `<div class="pct_arrow" data-popper-arrow></div>`
};

function showLog(msg,msg2 = null){
    if(tour.debug){
    console.log(msg, msg2)
    }
};

function buildStyles(tour){
    let pctStyles = document.createElement('style')
    let css = ``
    css += `.pct_tooltip {
        background-color: ${tour.ttOptions.bgColor || '#FFFFFF'};
        color: ${tour.ttOptions.textColor || '#000000'};
        font-family: ${tour.ttOptions.fontFamily || 'Arial, Helvetica, sans-serif'};
        font-weight: ${tour.ttOptions.fontWeight || 'bold'};
        padding: 4px 8px;
        font-size: 14px;
        border-radius: 5px;
        display: none;
    }\r\n`
    css += `.pct_tooltip[data-show] {display: block;}\r\n`
    css += `.pct_arrow,.pct_arrow::before {position: absolute; width: 8px; height: 8px; background: inherit;}\r\n`
    css += `.pct_arrow {visibility: hidden;}\r\n`
    css += `.pct_arrow::before {visibility: visible; content: ''; transform: rotate(45deg);}\r\n`
    css += `.pct_tooltip[data-popper-placement^='top'] > .pct_arrow {bottom: -4px;}\r\n`
    css += `.pct_tooltip[data-popper-placement^='bottom'] > .pct_arrow {top: -4px;}\r\n`
    css += `.pct_tooltip[data-popper-placement^='left'] > .pct_arrow {right: -4px;}\r\n`
    css += `.pct_tooltip[data-popper-placement^='right'] > .pct_arrow {left: -4px;}\r\n`
    css += `.invis{visibility: hidden;}\r\n`
    css += `.hidden{display: none;}\r\n`
    css += `.pct_header{display: flex; justify-content: center;}\r\n`
    css += `.pct_title{margin-top: 7px;margin-right: auto}\r\n`
    css += `.pct_content{min-width: 200px; overflow-y: auto;padding-bottom: 10px;font-weight: normal;font-size: 1.2em;line-height: 1.4em;}\r\n`
    css += `.pct_content a{color: ${tour.ttOptions.linkColor|| 'blue'}} .pct_content a:hover{color: ${tour.ttOptions.hoverColor || 'purple'}}\r\n`
    css += `.pct_actions{display: flex;justify-content: center;align-items: center;padding: 5px 0px; font-size: 1.3em;}\r\n`
    css += `.pct_actions button{cursor: pointer;}\r\n`
    css += `.pct_close{display: flex;cursor: pointer;padding-top: 5px;padding-right: 5px;font-weight: 800;font-size: 1.4em;margin-left: auto}\r\n`
    css += `.pct_actions > button:first-of-type{margin-right: auto; font-size: 1rem;}\r\n`
    css += `.pct_actions > button:last-of-type{margin-left: auto; font-size: 1rem;}\r\n`   
    pctStyles.innerHTML = css
    const pctStyleEl = document.head.appendChild(pctStyles)
    pctStyleEl.classList.add('pctStyles')
    pctStyleEl.setAttribute('id','pctStyles')
}
var $ = document.querySelector.bind(document);
document.addEventListener("DOMContentLoaded", initPopcornTour($));