import Dictionary from "./dictionary.ts";
export default class Offspring {
    CLASS: string;
    text:string;
    id:string;
    leaves:Offspring[];
    root:Dictionary;
    parentId:string;
    getParent() {
        if (this.root && this.parentId) {
            return this.root[this.parentId];
        }
        else {
            return null;
        }
    }
    setParent(aParent:Offspring) {
        this.parentId = aParent.id;
    }

    constructor(id:string, text:string, t:Dictionary) {
        this.CLASS = "Offspring";
        this.id = id;
        this.text = text;
        this.root = t;
        this.leaves = [];
        if (this.root != null) {
            this.root[id] = this;
        }

    }

    add(leaf:Offspring) {
        leaf.setParent(this);

        this.leaves[this.leaves.length] = leaf;
    }


    list(treeid:string) {
        var htmlString = '<li id="';
        htmlString += this.id;
        htmlString += '">';
        var numLeaves = this.leaves.length;

        htmlString += '<div class="record" id="text_' + this.id + '">' + this.text;
        htmlString += this.buttonHtml(treeid)  + '</div>';
        if (numLeaves > 0) {
            htmlString += '<ul id="' + this.id +  '">';
            for (var j = 0; j < numLeaves; j++) {
                htmlString += this.leaves[j].list(treeid);
            }
            htmlString += '</ul>';
        }
        htmlString += '</li>';
        return htmlString;
    }

    buttonHtml(treeid) {
        var parent = this.getParent();
            var ret = '';
        ret += '<img src="img/edit.gif" class="pull-right edit" onClick="' + treeid + '.editNode(\'' + this.id + '\')">';
        ret += '<img src="img/add.gif" class="pull-right add" onClick="' + treeid + '.addNode(\'' + this.id + '\')">';
        if (parent != null) {
            ret += '<img src="img/delete.gif" class="pull-right delete" onClick="' + treeid + '.deleteNode(\'' + this.id + '\')">';
        }
        return ret;
    }
}

