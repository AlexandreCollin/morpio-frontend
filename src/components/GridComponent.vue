<script setup lang="ts">
  import { type PropType } from "vue";
  import { CellValue } from "../services/GameWebSocket"

  const defaultGridSize = 3;

  const props = defineProps({
    enable: {
      type: Boolean,
      default: true,
    },
    cellValue: {
      type: String as PropType<CellValue>,
      default: CellValue.Empty,
    },
    gridColor: {
      type: String,
      default: "#22333B",
    },
    onCaseToggle: {
      type: Function as PropType<(rowIndex: number, cellIndex: number) => void>,
      default: (_: number, __: number) => {},
    },
    grid: {
      type: Array as PropType<Array<Array<CellValue>>>,
      default: Array.from({ length: defaultGridSize }, () => Array.from({ length: defaultGridSize }, () => CellValue.Empty))
    }
  })

  const toggleCase = (rowIndex: number, cellIndex: number) => {
    if (!props.enable) return;

    if (props.grid[rowIndex][cellIndex] !== CellValue.Empty) return;

    props.onCaseToggle(rowIndex, cellIndex);
  };
  

</script>

<template>
    <div class="grid">
      <div v-for="(row, rowIndex) in props.grid">
        <div v-if="rowIndex" class="row-divider" />
        <div class="grid-row">
          <div v-for="(cell, cellIndex) in row" class="cell">
            <div v-if="cellIndex" class="column-divider" />
            <div @click="() => toggleCase(rowIndex, cellIndex)" class="cell-content">{{ cell }}</div>
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped>
  .grid {
    border: 5px solid v-bind('props.gridColor');
  }
  .grid-row {
    display: flex;
    flex-direction: row;
  }

  .row-divider {
    height: 5px;
    background-color: v-bind('props.gridColor');
  }

  .column-divider {
    width: 5px;
    background-color: v-bind('props.gridColor');
  }

  .cell {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .cell-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    font-size: 50px;
    font-weight: bold;
    padding: 0 25px;
    cursor: pointer;
    user-select: none;
  }
</style>