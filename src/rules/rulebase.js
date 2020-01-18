
class RuleBase {
    /**
     * Набор селекторов (Block.selector) узлов, на которых будет срабатывать правило.
     * Если не задан - будет срабатывать на каждом узле.
     *
     * @param {Array<string>} filter
     */
    constructor(filter = []) {
    }

    /**
     * Вызывается при входе в очередной узел дерева
     *
     * @param {Block} node
     * @return {!LintError|undefined}
     */
    in(node) {}

    /**
     * -//- при выходе
     *
     * @param {Block} node
     * @return {!LintError|undefined}
     */
    out(node) {}

    /**
     * -//- при завершении обхода
     *
     * @return {!LintError|undefined}
     */
    end() {}
}

export default RuleBase;