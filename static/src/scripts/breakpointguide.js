/**
 * Breakpoint guide
 */
import $ from 'jquery';

export default function breakpoints() {
    const bpgmarkup = `
        <div class="breakpointguide">
            <link rel="stylesheet" href="../styles/breakpointguide.css" />
            <span class="breakpointguide-label"></span>
            <span class="breakpointguide-value"></span>
        </div>`;
    $('body').append(bpgmarkup);
}

