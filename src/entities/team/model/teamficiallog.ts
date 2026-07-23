export interface RequesterInfo {
  userId: number;
  requesterName: string;
}

export interface KeywordItem {
  keywordId: number;
  keywordName: string;
  count: number;
  head: boolean;
}

export interface KeywordListResponse {
  content: KeywordItem[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  hasNext: boolean;
}

export interface KeywordCommentRequest {
  keywordId: number;
  page?: number;
  size?: number;
}

export interface KeywordCommentResponse {
  data: {
    commentId: number;
    comment: string;
    createdAt: string;
  }[];
  hasNext: boolean;
  nextPage: number;
}
