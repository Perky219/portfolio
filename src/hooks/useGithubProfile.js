import { useEffect, useState } from "react";

const cache = {};

export function useGithubProfile(username) {
  const [profile, setProfile] = useState(cache[username] ?? null);
  const [loading, setLoading] = useState(!cache[username]);

  useEffect(() => {
    if (!username || cache[username]) return;
    setLoading(true);
    fetch(`https://api.github.com/users/${username}`)
      .then((r) => r.json())
      .then((data) => {
        cache[username] = data;
        setProfile(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [username]);

  return { profile, loading };
}
