import Tree from './tree.js';

class Linter {
    static lint(str) {
        const tree = new Tree(str);

        return tree.getRoot();
    }
}

export default Linter;