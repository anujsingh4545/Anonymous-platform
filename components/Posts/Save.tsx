import { callReload, deleteSaved } from "@/Recoil/slices/SavedPostSlice";
import axios, { AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa6";
import { useDispatch } from "react-redux";

interface SaveProps {
  userId: string;
  postId: string;
  saved: any;
}

const checkUserSaved = (saved: any[], userId: string): boolean => {
  if (!userId) return false;

  for (const save of saved) {
    if (save.userId === userId) {
      return true;
    }
  }
  return false;
};

const Save = ({ userId, postId, saved }: SaveProps) => {
  const dispatch = useDispatch();
  const session: any = useSession();
  const [hasSaved, SetHasSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const userHasSaved = useMemo(() => checkUserSaved(saved, session.data.user.id), [saved, session]);

  useEffect(() => {
    SetHasSaved(userHasSaved);
  }, [userHasSaved]);

  const ManageSave = async () => {
    SetHasSaved(!hasSaved);
    dispatch(deleteSaved({ postId }));
    dispatch(callReload());
    setLoading(true);
    await axios
      .post("https://anonymousplatform.vercel.app/api/posts/save", { userId: session.data.user.id, postId })

      .catch((e: any) => {
        SetHasSaved(!hasSaved);
        toast.error("Something went wrong !");
      })
      .finally(() => setLoading(false));
  };

  return (
    <button className="postView1  outline-none" onClick={ManageSave} disabled={loading}>
      {hasSaved ? (
        <>
          <FaBookmark size={15} className="  text-white " /> <p>Save</p>
        </>
      ) : (
        <>
          <CiBookmark size={15} /> <p>Save</p>
        </>
      )}
    </button>
  );
};

export default Save;
