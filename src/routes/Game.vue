<script setup lang="ts">
    import TitleComponent from "../components/TitleComponent.vue";
    import GridComponent from "../components/GridComponent.vue";
    import GameWebSocket, { CellValue } from "../services/GameWebSocket";
    import CopyToClipboardButtonComponent from "../components/CopyToClipboardButtonComponent.vue";

    import { ref, type Ref } from "vue";

    const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
    const gameIdParam = urlParams.get("id");
    
    const gameObjectSocket = new GameWebSocket({
        onInit: (gws) => {
            if (gameIdParam) {
                gws.joinLobby(gameIdParam);
            } else {
                gws.createLobby((id) => {
                    const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '#/game?id=' + id;
                    window.history.replaceState({path:newurl}, '', newurl);
                    gameId.value = id;
                });
            }
        },
        onGameStart: (value) => {
            cellValue.value = value;
            gameStarted.value = true;
            hasToPlay.value = value === CellValue.X;
        },
        onIllegalPlay(data) {
            grid.value[data.row][data.column] = CellValue.Empty;
        },
        onPlay(data) {
            console.log(data)
            grid.value[data.row][data.column] = data.cellValue;
            hasToPlay.value = true;
        },
        onGameOver(winner) {
            if (winner == CellValue.Empty) alert("Draw !");
            else {
                alert(winner == cellValue.value ? "You won !" : "You lost !");
            }
        }
    });


    let gameStarted: Ref<boolean> = ref(false);
    let gameId: Ref<string | null> = ref(null);
    let cellValue: Ref<CellValue> = ref(CellValue.Empty);
    
    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href);
        isCopied.value = true;
        setTimeout(() => isCopied.value = false, 5000);
    }

    let isCopied: Ref<boolean> = ref(false);

    const toggleCase = (rowIndex: number, cellIndex: number) => {
        console.log(hasToPlay.value)
        if (!gameStarted.value || !hasToPlay.value) return;
        grid.value[rowIndex][cellIndex] = cellValue.value;
        gameObjectSocket.play(rowIndex, cellIndex);
        hasToPlay.value = false;
    };

    const defaultGridSize = 3;

    let grid = ref(Array.from({ length: defaultGridSize }, () => Array.from({ length: defaultGridSize }, () => CellValue.Empty)));

    let hasToPlay = ref(false);
</script>

<template>
    <TitleComponent />
    <p v-if="!gameStarted">Waiting for opponent...</p>
    <GridComponent :grid="grid" :cellValue=cellValue :enable=gameStarted :onCaseToggle="toggleCase"/>
    <div style="height: 100px;"/>
    <CopyToClipboardButtonComponent @click="copyToClipboard" v-if="!gameStarted && gameId">{{ isCopied ? "Copied !" : "Copy game link" }}</CopyToClipboardButtonComponent>
</template>