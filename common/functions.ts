import axios, { AxiosError, AxiosResponse } from "axios";

export const setComment = async (setData: any, comment: any) => {
  setData((prev: any) => ({
    ...prev,
    comment: [comment.comment, ...prev.comment],
  }));
};

export const deleteComment = async (id: any, setData: any) => {
  setData((prev: any) => ({
    ...prev,
    comment: prev.comment.filter((comment: any) => comment.id !== id),
  }));
};

export const call = async (userId: string, id: string, Likeid: string, setLoading: any, setData: any, choosed: string) => {
  setLoading(true);
  await axios
    .post("https://anonymousplatform.vercel.app/api/posts/managelikedislike", { userId, id, choosed, Likeid })
    .then((res: AxiosResponse) => {
      setData((prev: any) => {
        let newState = { ...prev };

        newState.comment = newState.comment.map((c: any) => {
          if (c.id === id) {
            return res.data.data;
          }

          return c;
        });

        return newState;
      });
    })
    .catch((e: AxiosError) => {})
    .finally(() => setLoading(false));
};
