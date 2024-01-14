import {f_o_html__and_make_renderable} from "https://deno.land/x/f_o_html_from_o_js@2.1/mod.js";
import {
    f_add_css,
    f_s_css_prefixed, 
    o_variables as o_variables_css, 
    f_s_css_from_o_variables
} from "https://deno.land/x/f_add_css@1.1/mod.js"

import {
    BlobReader,
    BlobWriter,
    TextReader,
    TextWriter,
    ZipReader,
    ZipWriter,
    Uint8ArrayReader, 
    Uint8ArrayWriter
  } from "https://deno.land/x/zipjs@v2.7.32/index.js";

// ----
// Write the zip file
// ----

// Creates a BlobWriter object where the zip content will be written.
const zipFileWriter = new BlobWriter();
// Creates a TextReader object storing the text of the entry to add in the zip
// (i.e. "Hello world!").
const helloWorldReader = new TextReader("Hello world!");

// Creates a ZipWriter object writing data via `zipFileWriter`, adds the entry
// "hello.txt" containing the text "Hello world!" via `helloWorldReader`, and
// closes the writer.
const zipWriter = new ZipWriter(zipFileWriter);
await zipWriter.add("hello.txt", helloWorldReader);
await zipWriter.close();

// Retrieves the Blob object containing the zip content into `zipFileBlob`. It
// is also returned by zipWriter.close() for more convenience.
const zipFileBlob = await zipFileWriter.getData();

// ----
// Read the zip file
// ----

// Creates a BlobReader object used to read `zipFileBlob`.
const zipFileReader = new BlobReader(zipFileBlob);
// Creates a TextWriter object where the content of the first entry in the zip
// will be written.
const helloWorldWriter = new TextWriter();

// Creates a ZipReader object reading the zip content via `zipFileReader`,
// retrieves metadata (name, dates, etc.) of the first entry, retrieves its
// content via `helloWorldWriter`, and closes the reader.


function f_add_iamge_from_a_n_u8(uint8Array) {
    // Convert Uint8Array to Blob
    const blob = new Blob([uint8Array], { type: 'image/jpeg' }); // Adjust the MIME type as necessary

    // Create Object URL from Blob
    const url = URL.createObjectURL(blob);

    // Create Image object
    const img = new Image();
    img.onload = function() {
        // Get canvas and context
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext('2d');

        // Set canvas size to image size
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the image
        ctx.drawImage(img, 0, 0);

        // Clean up
        URL.revokeObjectURL(url);
        document.body.appendChild(canvas)
    };
    img.onerror = function(o){
        console.error(o)
    }
    // Set image source
    img.src = url;
}

let o_state = {
    a_o_entry:[],
    b_display_o_js__status: true,
    b_display_o_js__gui: true,
    a_s_url_image: [],
    n_idx: 0, 
    n_ms_interval: 1000,
    n_id_raf: 0,
    n_ms_wpn_last: window.performance.now(), 
    b_recursive_running: false,
    s_text_status: "please load a .zip file to load images", 
    s_js__text_image: '${name}: ${n_idx+1}/${n_len}'
}
window.o_state = o_state

let f_update_and_render_s_text_status = function(s){
    o_state.s_text_status = s;
    o_state.o_js__status?._f_update();
}
let f_recursive = function(){
    o_state.n_id_raf = requestAnimationFrame(f_recursive);
    let n_ms_wpn = window.performance.now();
    if(Math.abs(n_ms_wpn-o_state.n_ms_wpn_last) > o_state.n_ms_interval){
        o_state.b_recursive_running = true;
        f_show_image_from_index(
            o_state.n_idx+1
        )
        o_state?.o_js__image?._f_render?.();
        o_state.n_ms_wpn_last = n_ms_wpn
    }
}
let f_stop = function(){
    cancelAnimationFrame(o_state.n_id_raf);
    o_state.b_recursive_running = false;
}
let f_start = function(){
    o_state.n_id_raf = requestAnimationFrame(f_recursive);
    o_state.b_recursive_running = true;
}
let f_show_image_from_index = function(
    n_idx, 
){
    
    o_state.n_idx = n_idx % o_state.a_o_entry.length;
    if(o_state.n_idx < 0){
        o_state.n_idx = o_state.a_o_entry.length-1;
    } 
    let o_params = {
        name: o_state.a_o_entry[n_idx].filename,
        n_idx: o_state.n_idx, 
        n_len: o_state.a_o_entry.length
    }
    f_update_and_render_s_text_status(
        new Function(
            Object.keys(o_params),
            `return \`${o_state.s_js__text_image}\``
        )(
            ...Object.values(
                o_params
            )
        )
    )
    o_state?.o_js__image?._f_render?.();

}
let o = {
    f_o_jsh: ()=>{
        return {
            class: 'app',
            a_o:[
                Object.assign(
                    o_state, 
                    {
                        o_js__image: {
                            f_o_jsh: async ()=>{
                                console.log(o_state.a_s_url_image[o_state.n_idx])
                                return {
                                    s_tag: "img", 
                                    src: o_state.a_s_url_image[o_state.n_idx]
                                }
                            }
                        }
                    }
                ).o_js__image,
                Object.assign(
                    o_state, 
                    {
                        o_js__b_show_image_name: {
                            f_o_jsh: async ()=>{
                                console.log(o_state.a_s_url_image[o_state.n_idx])
                                return {
                                    a_o: [
                                        {
                                            s_tag: "label", 
                                            innerText: 'show image name'
                                        }
                                    ],
                                    class: [
                                        'clickable', 
                                        (o_state.b_show_image_name) ? 'clicked' : false,
                                    ].filter(v=>v).join(' '),
                                }
                            }
                        }
                    }
                ).o_js__b_show_image_name,
                Object.assign(
                    o_state, 
                    {
                        o_js__status: {
                            f_o_jsh: ()=>{
                                return {
                                    class:'status',
                                    style: `display: ${(o_state.s_text_status?.trim() != '') ? 'block': 'none'}`,
                                    innerText: o_state.s_text_status
                                }
                            }
                        }
                    }
                ).o_js__status,
                {
                    class: 'inputs', 
                    a_o: [
                        {
                            class: "toggle_gui clickable", 
                            innerText: "toggle gui",
                            onclick: ()=>{
                                o_state.b_display_o_js__gui = !o_state.b_display_o_js__gui
                                o_state?.o_js__gui?._f_update?.();
                            }
                        },
                        Object.assign(
                            o_state, 
                            {
                                o_js__gui: {
                                    f_o_jsh: ()=>{
                                        return {
                                            style: `display: ${(o_state.b_display_o_js__gui) ? 'block': 'none'}`,
                                            a_o:[
                                                {
                                                    s_tag: 'label', 
                                                    innerText: "image info, (name, n_idx, n_len) are variables that can be used"
                                                },
                                                {
                                                    s_tag: "input",
                                                    value: o_state.s_js__text_image, 
                                                    oninput: function(o_e){
                                                        o_state.s_js__text_image = o_e.target.value
                                                    }
                                                },
                                                {
                                                    class: "clickable", 
                                                    innerText: 'next >', 
                                                    onclick: ()=>{
                                                        f_show_image_from_index(
                                                            o_state.n_idx+1
                                                        )
                                                    }
                                                },
                                                {
                                                    class: "clickable", 
                                                    innerText: '< prev', 
                                                    onclick: ()=>{
                                                        f_show_image_from_index(
                                                            o_state.n_idx-1
                                                        )
                                                    }
                                                },
                                                Object.assign(
                                                    o_state,
                                                    {
                                                        o_js__n_ms_interval: {
                                                            f_o_jsh: ()=>{
                                                                return {
                                                                    innerText: `interval in milliseconds: ${o_state.n_ms_interval}`, 

                                                                }
                                                            }
                                                        }
                                                    }
                                                ).o_js__n_ms_interval,
                                                {
                                                    s_tag: 'input', 
                                                    type: "range", 
                                                    min: 100, 
                                                    max: 5000,
                                                    value: o_state.n_ms_interval, 
                                                    oninput: function(o_e){
                                                        o_state.n_ms_interval = parseFloat(o_e.target.value)
                                                        o_state?.o_js__n_ms_interval?._f_update()
                                                    }
                                                },
                                                Object.assign(
                                                    o_state,
                                                    {
                                                        o_js__start_stop: {
                                                            f_o_jsh: ()=>{
                                                                return {
                                                                    class: "clickable",
                                                                    innerText: `${(o_state.b_recursive_running) ? "stop" : 'start'}`, 
                                                                    onclick: function(){
                                                                        if(o_state.b_recursive_running){
                                                                            f_stop()
                                                                        }else{
                                                                            f_start()
                                                                        }
                                                                        o_state?.o_js__start_stop?._f_update()
                                                                    } 
                                                                }
                                                            }
                                                        }
                                                    }
                                                ).o_js__start_stop,
                                                {
                                                    s_tag: 'input',
                                                    type: 'file', 
                                                    accept: [
                                                        "zip",
                                                        "application/octet-stream",
                                                        "application/zip",
                                                        "application/x-zip",
                                                        "application/x-zip-compressed"
                                                    ].join(','),
                                                    onchange:async function(o_e){
                                                        f_update_and_render_s_text_status(
                                                            `file picked!`
                                                        )
                                                        var o_file = o_e.target.files[0]; // Get the first file
                                                        if (o_file) {
                                                            // Handle the file. Example: print the file name                                                            

                                                            var o_reader = new FileReader();
                                                            o_state?.o_js__status?._f_update?.();
                                                            let n  = 0;
                                                            o_reader.onprogress = function(){
                                                                n = (n+1)%3;
                                                                // console.log(o_file)
                                                                f_update_and_render_s_text_status(
                                                                    `reading zip file ${o_file.name} ${(new Array(n).fill('.').join('')).padStart(' ', 3)}`
                                                                );
                                                            }
                                                            o_reader.onload = async function(o_e_fr) {
                                                                f_update_and_render_s_text_status(
                                                                    `zip file loaded`
                                                                )
                                                                try {                                                                    
                                                                    var o_abuffer = o_e_fr.target.result;
                                                                    var a_n_u8 = new Uint8Array(o_abuffer);
                                                                    // console.log(a_n_u8);
                                    
                                                                    const o_zip_reader = new ZipReader(
                                                                        new Uint8ArrayReader(a_n_u8)
                                                                    );
                                                                    o_state.a_s_url_image.map(s=>{
                                                                        URL.revokeObjectURL(s_url)
                                                                        return true
                                                                    })
                                                                    o_state.a_o_entry = (await o_zip_reader.getEntries());
                                                                    o_state.a_s_url_image = [];
                                                                    o_state.n_idx = 0;
                                                                    for(let n_idx in o_state.a_o_entry){
                                                                        let o_entry = o_state.a_o_entry[n_idx];
                                                                        f_update_and_render_s_text_status(
                                                                            `loading image ${parseInt(n_idx)+1}/${o_state.a_o_entry.length}`
                                                                        )
                                                                        console.log(o_entry);
                                                                        const a_n_u8_image = await o_entry.getData(
                                                                            new Uint8ArrayWriter()
                                                                        );
                                                                        const o_blob = new Blob([a_n_u8_image], { type: 'image/jpeg' }); // Adjust the MIME type as necessary
                                                                        // Create Object URL from Blob
                                                                        let s_url = URL.createObjectURL(o_blob);
                                        
                                                                        o_state.a_s_url_image.push(s_url);
                                    
                                                                        // console.log(v)
                                                                        // f_add_iamge_from_a_n_u8(v);
                                                                    }
                                    
                                    
                                                                    await o_zip_reader.close();
                                    
                                                                    o_state?.o_js__image?._f_render?.();
                                    
                                                                    // Further processing with uint8Array
                                                                } catch (error) {
                                                                    f_update_and_render_s_text_status(
                                                                        `could not load images from .zip, make sure the zip contains images only and is not all to big
                                                                        error: ${error}`
                                                                    )
                                                                    o_state.o_js__status?._f_update();
                                                                }
                                                            };
                                            
                                                            o_reader.readAsArrayBuffer(o_file);
                                
                                                        }
                                                    }
                                                },
                                            ]
                                        }
                                    }
                                }
                            }
                        ).o_js__gui
                    ]
                }

            ]
        }
    }
}
var o_html = await f_o_html__and_make_renderable(o);
document.body.className = 'theme_dark'
document.body.appendChild(o_html)

f_add_css('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

// o_hsla__fg: O_vec4
// o_hsla__fg_hover: O_vec4
// o_hsla__fg_active: O_vec4
// o_hsla__fg_active_hover: O_vec4
// o_hsla__bg: O_vec4
// o_hsla__bg_hover: O_vec4
// o_hsla__bg_active: O_vec4
// o_hsla__bg_active_hover: O_vec4
// o_hsla_addition_vector_hover: O_vec4
// o_hsla_addition_vector_active: O_vec4
// n_rem_font_size_base: number
// a_n_factor_heading_font_size: number[]
// a_n_factor_heading_margin_botton: number[]
// o_hsla_primary: O_vec4
// o_hsla_secondary: O_vec4
// n_rem_padding_interactive_elements: number
// n_rem_border_size_interactive_elements: number
// n_px_border_clickable_with_border: number
// n_px_border_radius: number
// s_border_style: string
// n_nor_line_height_p: number
// n_rem_margin_bottom_interactive_elements: number]
o_variables_css.n_rem_font_size_base = 1.1
o_variables_css.n_rem_padding_interactive_elements = 0.5;
let s_css_theme = f_s_css_from_o_variables(
    o_variables_css
);

let s_css = `
        ${s_css_theme}
        .app{
            overflow:hidden;
            width: 100vw;
            height:100vh;
        }
        .inputs{
            position:fixed;
            top:0;
            left:0;
            width:100%;
            height:100%;
        }
        .status{
            position:fixed;
            right: 0;
            bottom:0;
            padding: 1rem;
            background: rgba(0,0,0,0.2)
        }
        img{
            height: 100%; width: 100%; object-fit: contain
        }
`;
// let s_css_prefixed = f_s_css_prefixed(
//     s_css,
//     `.${s_version_class}`
// );
f_add_css(s_css)
