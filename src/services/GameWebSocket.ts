export enum CellValue {
  X = "X",
  O = "O",
  Empty = "",
}

class GameEvent {
  private readonly _event: string;

  public get event(): string {
    return this._event;
  }

  private readonly func: Function;

  constructor(event: string, func: Function) {
    this._event = event;
    this.func = func;
  }

  public call(data: unknown): void {
    this.func(data);
  }
}

export default class GameWebSocket {
  private readonly ws: WebSocket;
  private readonly onGameStart: (cellValue: CellValue) => void;
  private readonly gameEvents: GameEvent[];

  constructor({
    onInit,
    onGameStart,
    onPlay,
    onIllegalPlay,
    onGameOver,
  }: {
    onInit: (ws: GameWebSocket) => void;
    onGameStart: (cellValue: CellValue) => void;
    onPlay: ({
      row,
      column,
      cellValue,
    }: {
      row: number;
      column: number;
      cellValue: CellValue;
    }) => void;
    onIllegalPlay: ({ row, column }: { row: number; column: number }) => void;
    onGameOver: (winner: CellValue) => void;
  }) {
    this.ws = new WebSocket(import.meta.env.VITE_WEB_SOCKET_URL!);
    this.onGameStart = onGameStart;

    this.ws.onopen = () => onInit(this);
    this.ws.onmessage = this.waitStarting;

    this.gameEvents = [
      new GameEvent("play", onPlay),
      new GameEvent("illegalPlay", onIllegalPlay),
      new GameEvent("gameOver", onGameOver),
    ];
  }

  private waitStarting = (message: MessageEvent) => {
    const { event, data } = JSON.parse(message.data);
    if (event === "starting") {
      this.onGameStart(data);
      this.ws.onmessage = this.onPlayEvent;
    }
  };

  private onPlayEvent = (message: MessageEvent) => {
    const { event, data } = JSON.parse(message.data);

    const gameEvent = this.gameEvents.find(
      (gameEvent) => gameEvent.event === event,
    );
    if (gameEvent) {
      gameEvent.call(data);
    }
  };

  createLobby(onCreated: (id: string) => void): void {
    this.ws.onmessage = (message) => {
      console.log("Message received: ", message.data);
      const { event, data } = JSON.parse(message.data);
      if (event === "lobbyCreated") {
        onCreated(data);
        console.log("Waiting for players...");
        this.ws.onmessage = this.waitStarting;
      }
    };
    this.ws.send(
      JSON.stringify({
        event: "createLobby",
      }),
    );
  }

  joinLobby(id: string): void {
    this.ws.send(JSON.stringify({ event: "joinLobby", data: id }));
  }

  play(row: number, column: number): void {
    this.ws.send(
      JSON.stringify({
        event: "play",
        data: {
          row: row,
          column: column,
        },
      }),
    );
  }
}
