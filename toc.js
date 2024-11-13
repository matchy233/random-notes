// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item affix "><a href="index.html">Random Notes</a></li><li class="chapter-item affix "><li class="part-title">Reverse Engineering</li><li class="chapter-item "><a href="RevEng/gdb.html"><strong aria-hidden="true">1.</strong> GDB 101</a></li><li class="chapter-item "><a href="RevEng/ascii-asm.html"><strong aria-hidden="true">2.</strong> (WIP) ASCII shellcode</a></li><li class="chapter-item affix "><li class="part-title">Linux</li><li class="chapter-item "><a href="Linux/disk-management.html"><strong aria-hidden="true">3.</strong> Disk Management</a></li><li class="chapter-item "><a href="Linux/net-forwarding.html"><strong aria-hidden="true">4.</strong> Internet Sharing</a></li><li class="chapter-item "><a href="Linux/ssh_config.html"><strong aria-hidden="true">5.</strong> ssh config</a></li><li class="chapter-item "><a href="Linux/perf.html"><strong aria-hidden="true">6.</strong> perf 101 for profiling</a></li><li class="chapter-item "><a href="Linux/locale.html"><strong aria-hidden="true">7.</strong> i18n related env var</a></li><li class="chapter-item "><a href="Linux/vpn-cisco-anyconnect.html"><strong aria-hidden="true">8.</strong> VPN via Cisco Anyconnect</a></li><li class="chapter-item affix "><li class="part-title">Windows</li><li class="chapter-item "><a href="windows/use-wsl-with-gui.html"><strong aria-hidden="true">9.</strong> X-forwarding on Windows</a></li><li class="chapter-item "><a href="windows/windows.html"><strong aria-hidden="true">10.</strong> Windows commad line / powershell</a></li><li class="chapter-item affix "><li class="part-title">Terminal / Commands</li><li class="chapter-item "><a href="Terminal/effective-shell.html"><strong aria-hidden="true">11.</strong> shell navigation 101</a></li><li class="chapter-item "><a href="Terminal/random-bash-tips.html"><strong aria-hidden="true">12.</strong> sh/bash command</a></li><li class="chapter-item "><a href="Terminal/tmux.html"><strong aria-hidden="true">13.</strong> TMUX 101</a></li><li class="chapter-item "><a href="Terminal/shellrc.html"><strong aria-hidden="true">14.</strong> shellrc</a></li><li class="chapter-item "><a href="Terminal/gpg.html"><strong aria-hidden="true">15.</strong> GPG</a></li><li class="chapter-item "><a href="Terminal/w.html"><strong aria-hidden="true">16.</strong> output of w</a></li><li class="chapter-item "><a href="Terminal/git.html"><strong aria-hidden="true">17.</strong> Git (not 101)</a></li><li class="chapter-item affix "><li class="part-title">Python</li><li class="chapter-item "><a href="python/python.html"><strong aria-hidden="true">18.</strong> General</a></li><li class="chapter-item "><a href="python/ver-and-deps.html"><strong aria-hidden="true">19.</strong> Version and package management</a></li><li class="chapter-item affix "><li class="part-title">IDE</li><li class="chapter-item "><a href="IDE/vscode.html"><strong aria-hidden="true">20.</strong> VSCode tips</a></li><li class="chapter-item "><a href="IDE/jetbrains.html"><strong aria-hidden="true">21.</strong> JetBrains IDEs tips</a></li><li class="chapter-item affix "><li class="part-title">LaTeX</li><li class="chapter-item "><a href="latex/general-latex-tricks.html"><strong aria-hidden="true">22.</strong> General LaTeX</a></li><li class="chapter-item "><a href="latex/latex-workshop.html"><strong aria-hidden="true">23.</strong> LaTeX Workshop</a></li><li class="chapter-item affix "><li class="part-title">DevOps</li><li class="chapter-item "><a href="devops/hadoop-on-k8s.html"><strong aria-hidden="true">24.</strong> Hadoop in K8S</a></li><li class="chapter-item "><a href="devops/aws-amplify.html"><strong aria-hidden="true">25.</strong> AWS Amplify Attempts</a></li><li class="chapter-item affix "><li class="part-title">Frontend</li><li class="chapter-item "><a href="frontend/fix-node-modules.html"><strong aria-hidden="true">26.</strong> Patch node-modules without PR</a></li><li class="chapter-item "><a href="frontend/group-buddy-teach-me-how-to-write-js.html"><strong aria-hidden="true">27.</strong> Frontend from scratch</a></li><li class="chapter-item affix "><li class="part-title">Literature</li><li class="chapter-item "><a href="literature/literature.html"><strong aria-hidden="true">28.</strong> Literature Excerpts</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="literature/literature/shang-shi-jie.html"><strong aria-hidden="true">28.1.</strong> 商市街</a></li></ol></li><li class="chapter-item "><a href="literature/poems.html"><strong aria-hidden="true">29.</strong> Poem Excerpts</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="literature/poems/blind-girl.html"><strong aria-hidden="true">29.1.</strong> 盲女</a></li><li class="chapter-item "><a href="literature/poems/ocnos.html"><strong aria-hidden="true">29.2.</strong> 《奥克诺斯》</a></li><li class="chapter-item "><a href="literature/poems/20-love-poems-and-a-song-of-despair.html"><strong aria-hidden="true">29.3.</strong> 《二十首爱情诗和一首绝望的歌》</a></li><li class="chapter-item "><a href="literature/poems/sleep-with-you.html"><strong aria-hidden="true">29.4.</strong> 穿过大半个中国去睡你</a></li><li class="chapter-item "><a href="literature/poems/ale-you-are-unfortunately-reminded-by-me.html"><strong aria-hidden="true">29.5.</strong> 阿乐，你又不幸地被我想起</a></li><li class="chapter-item "><a href="literature/poems/you-did-not-see-my-obscured-part.html"><strong aria-hidden="true">29.6.</strong> 你没有看见我被遮蔽的部分</a></li><li class="chapter-item "><a href="literature/poems/had-i-not-seen-the-sun.html"><strong aria-hidden="true">29.7.</strong> Had I Not Seen The Sun</a></li><li class="chapter-item "><a href="literature/poems/ocd.html"><strong aria-hidden="true">29.8.</strong> OCD</a></li><li class="chapter-item "><a href="literature/poems/stranger.html"><strong aria-hidden="true">29.9.</strong> 路人</a></li></ol></li><li class="chapter-item "><a href="literature/geoffrey-a-landis-short-fictions.html"><strong aria-hidden="true">30.</strong> Geoffrey A. Landis short fictions</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="literature/geoffrey-a-landis-short-fictions/ripples-in-the-dirac-sea.html"><strong aria-hidden="true">30.1.</strong> Ripples in the Dirac Sea</a></li></ol></li><li class="chapter-item "><li class="part-title">Misc</li><li class="chapter-item "><a href="misc/sukhoi-fighters.html"><strong aria-hidden="true">31.</strong> Flankerology 101</a></li><li class="chapter-item "><a href="misc/move-to-basel.html"><strong aria-hidden="true">32.</strong> Move between Zurich and Basel</a></li><li class="chapter-item "><a href="misc/citation.html"><strong aria-hidden="true">33.</strong> Citation generation</a></li><li class="chapter-item "><a href="misc/notify.html"><strong aria-hidden="true">34.</strong> Notify myself</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString();
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);