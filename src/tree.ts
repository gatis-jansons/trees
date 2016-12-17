import Offspring from "./offspring.ts";
import Dictionary from "./dictionary.ts";
import * as $ from "jquery";

export default class Tree  {
    trunk:Offspring;
    id:string;
    dict:Dictionary;
    algor:string;

    constructor(anId:string, anAlg:string) {
        this.id = anId;
        this.algor = anAlg;
        this.dict = new Dictionary();
        this.trunk = new Offspring("trunk1", "Root", this.dict);

    }

    saveLocal() {
        var a = this.toJsonWithClass();
        localStorage.setItem(this.id, a);
    }

    restoreLocal(elemid, alg) {
        var a = localStorage.getItem(elemid);
        console.log(a);
        var ret = new Tree(elemid, alg);
        ret.load(a);
        var selector = '#' + elemid;
        var treeItem = $(selector);
        treeItem.html(ret.renderHtml());
        return ret;
    }

    toJsonWithClass() {
        return JSON.stringify(this.trunk, function (name, value) {
            if (value instanceof Dictionary) {
                return 'Dictionary(...)';
            }
            else {
                return value;
            }
        });
    }

    load(jsonString:string) {
        var yourJSONObject = JSON.parse(jsonString, (name, value) => {
            if (value && value.CLASS && value.CLASS === 'Offspring') {
                var ret = $.extend(new Offspring('a', 'a', this.dict), value);
                ret.root = this.dict;
                this.dict[ret.id] = ret;
                return ret;
            }
            else {
                return value;
            }
        });
        this.trunk = <Offspring>yourJSONObject;
    }

    public addNode(theid:string) {
        var item = $('#' + theid);

        var objNode = this.dict[theid];
        var num = Object.keys(this.dict).length + 1;
        objNode.add(new Offspring('node' + num, 'Node', this.dict));
        var treeItem = $('#' + this.id);

        treeItem.html(this.renderHtml());
    }

    deleteNode(theid) {
        var item = $('#' + theid);

        var objNode = this.dict[theid];
        var parent = objNode.getParent();
        if (parent != null) {
            var pos = parent.leaves.indexOf(objNode);
            parent.leaves.splice(pos, 1);
        }
        else {
            alert("The root node can not be deleted.");
       }
        var treeItem = $('#'  + this.id);

        treeItem.html(this.renderHtml());
    }

    editNode(theid) {
        var item = $('#' + theid);

        var objNode = this.dict[theid];
        var result = window.prompt("Edit node text", objNode.text);
        if (result != null) {
            objNode.text = result;
            var treeItem = $('#'  + this.id);
            treeItem.html(this.renderHtml());
        }
    }


    add(b:Offspring) {
        this.trunk.add(b);
    }


    private recursiveHtml() {
        var treeString = '<ul>';
        treeString += this.trunk.list(this.id);
        treeString += '</ul>';
        return treeString;
    }

    renderHtml() {
        if(this.algor === 'iterative') {
            return this.iterativeHtml();
        }
        else {
            return this.recursiveHtml();
        }
    }

    iterativeHtml() {
        var htmlString = '<ul>';

        var nodes = [];
        nodes.push(this.trunk);

        while (nodes.length) {
            var node = nodes.shift();
            if (node instanceof Offspring) {
                htmlString += '<li>';
                htmlString += '<div class="record" id="text_' + this.id + '">' + node.text;
                htmlString += node.buttonHtml(this.id)  + '</div>';

                if (node.leaves.length) {
                    htmlString += '<ul>';
                    nodes = [].slice.call(node.leaves.concat('</li></ul>')).concat(nodes);
                }
                else {
                    htmlString += '</li>';
                }
            }
            else {
                htmlString += node;
            }

        }
        htmlString += '</ul>';
        return htmlString;
    }
}


