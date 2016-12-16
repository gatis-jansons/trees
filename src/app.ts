import "./site.css";
import * as $ from "jquery";
import Tree from "./tree.ts";


mytree = new Tree('mytree', 'recursive');
itertree = new Tree('itertree', 'iterative');


$(() => {

        var treeElement = $('#mytree');
        var t = mytree.renderHtml();
        treeElement.html(t);

        var itertreeElement = $('#itertree');
        var it = itertree.renderHtml();
        itertreeElement.html(it);

});

