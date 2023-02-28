// ----- AUTH ----- //

export interface IStateAuth {
    token: null | string,
    isLoading: boolean,
    error: {
        name: string,
        password: string
    }
}

export interface IActionAuth {
    data: {
        name: string,
        password: string
    }
}

// ----- NEWS ----- //

export interface INews {
  title: string;
  summary: string;
  id: number;
  imageUrl: string;
  publishedAt: string;
}

export interface IStateNews {
    data: {
        items: INews[],
        totalCount?: number
    },
    isLoading: boolean,
    error: {
        status: string,
        code: number,
        message: string
    };
} 

export interface IActionError {
    status: string,
    code: number,
    data: {
        message: string
    }
}