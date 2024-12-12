export function addThemeToLink() {
    if(theme) {
        document.querySelectorAll('a').forEach(link => {
            let href = link.getAttribute('href');
            if(href && !href.includes('theme=')) {
                link.setAttribute('href', href + (href.includes('?') ? '&' : '?') + 'theme=' + theme);
            }
        });
    }
}
document.addEventListener('DOMContentLoaded', addThemeToLink);