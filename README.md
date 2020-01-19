## Архитектура и принцип работы

Вся работа по сбору ошибок проиходит за 1 обход в глубину. 

1. Класс JsonSourceMap преобразует строку в объект, по ходу дела размечивая каждый блок.
2. Linter выполняет один обход в глубину по размеченному plain объекту, конструируя дерево из BemNode-узлов.
3. В процессе обхода линтер сигнализирует посредника (RuleMediator) о событиях вроде in (вошли в очередной узел), out (вышли), а также end (завершили обход).
4. В свою очередь RuleMediator перенаправляет вызов обработчикам правил BaseRule (каждый такой класс описывает собственно логику одного правила/ошибки). Эти обработчики конструируются заранее.
5. Каждое правило это наследник BaseRule. Правило должно задать фильтр (для каких BemNode его следует вызвать), а также мапу {тип события, обработчик} (см метод getPhaseHandlersMap). Вся остальную логику, такая как сохранение состояния и накопление данных индивидуально для каждого правила. 

## Преимущества решения

**Масштабируемость**
Правила изолированны и не влияют друг на друга. Они сосредотачиваются на внутренней логике решения, а не второстепенных вещах типа обхода дерева.

**Производительность**
Если выполнение обработчиков в правилах занимает константное время, то полная валидация займет O(N*k), N - кол-во узлов в дереве, k - количество правил.
В данной реализации некоторые тесты по заголовкам на обработчике end выполняются в среднем O(log(N)), в худшем случае за O(N). Так как  обработчик вызывается единожды в самом конце, то полное время работы O(N)

## Недостатки
В правилах (RuleBase) пока нет возможности  точного сопоставления селектор-обработчик.  

Пример:  сейчас я задаю фильтр, чтобы обработчики для данного правила сработывали только на блоках warning, placeholder и button. При входе в каждый обработчик я вынужден проверять  (Я сейчас в warning? В placeholder? А, ну значит в button)

Из-за этого есть много boilerplate кода в начале каждого обработчика.

Есть идеи, как это можно поправить. Например, можно использовать более хитрые селекторы по типу CSS-ых (вызови вот этот обработчик, если я :nth-child своего родителя).

**Инфраструктура**

webpack, babel - release и development сборка (создание бандов, подключение зависимостей и т.д.)
live-server - для автообновления страницы браузера (дебажу в Chrome)
