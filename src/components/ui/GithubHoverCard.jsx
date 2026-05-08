import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FiUsers, FiBook, FiMapPin, FiGithub } from "react-icons/fi";
import { useGithubProfile } from "../../hooks/useGithubProfile";

export function GithubHoverCard({ children, username, placement = "top" }) {
  const [show, setShow] = useState(false);
  const { profile, loading } = useGithubProfile(username);

  const positionClass =
    placement === "top"
      ? "bottom-full mb-3"
      : "top-full mt-3";

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: placement === "top" ? 6 : -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: placement === "top" ? 6 : -6, scale: 0.96 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className={`absolute left-1/2 -translate-x-1/2 z-50 w-64 pointer-events-none ${positionClass}`}
          >
            <div
              className="bg-surface rounded-xl p-4 shadow-2xl shadow-black/40"
              style={{ border: "1px solid var(--color-edge)" }}
            >
              {loading ? (
                <div className="flex items-center gap-2 text-ink-3 text-xs font-mono">
                  <FiGithub size={14} className="animate-pulse text-accent" />
                  Loading profile…
                </div>
              ) : profile ? (
                <>
                  <div className="flex items-start gap-3 mb-3">
                    <img
                      src={profile.avatar_url}
                      alt={profile.name}
                      className="w-10 h-10 rounded-full ring-2 ring-accent/30"
                    />
                    <div className="min-w-0">
                      <p className="text-ink font-semibold text-sm leading-tight truncate">
                        {profile.name}
                      </p>
                      <p className="text-ink-3 font-mono text-xs">@{profile.login}</p>
                    </div>
                  </div>

                  {profile.bio && (
                    <p className="text-ink-2 text-xs leading-relaxed mb-3 line-clamp-2">
                      {profile.bio}
                    </p>
                  )}

                  <div className="flex items-center gap-4 text-xs font-mono text-ink-3">
                    <span className="flex items-center gap-1">
                      <FiUsers size={11} className="text-accent" />
                      {profile.followers}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiBook size={11} className="text-accent" />
                      {profile.public_repos} repos
                    </span>
                  </div>

                  {profile.location && (
                    <p className="mt-2 flex items-center gap-1 text-xs font-mono text-ink-3">
                      <FiMapPin size={10} className="text-warm" />
                      {profile.location}
                    </p>
                  )}
                </>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
