import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { leaderboardData, currentUser } from "@/data/mockData";
import { 
  Trophy, Globe, Building, Users, Search, 
  TrendingUp, TrendingDown, Minus, Target, 
  CheckCircle, X, Star
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const colleges = ["All", "KEMU", "Aga Khan", "AIMC", "Dow Medical", "King Edward"];
const timeFilters = ["All Time", "This Month", "This Week"];
const ITEMS_PER_PAGE = 100;

interface LeaderboardUser {
  rank: number;
  name: string;
  username: string;
  college: string;
  solved: number;
  accuracy: number;
  score: number;
  rankChange: number;
  topSubject: string;
}

const Leaderboard = () => {
  const [view, setView] = useState<"global" | "college">("global");
  const [collegeFilter, setCollegeFilter] = useState("All");
  const [timeFilter, setTimeFilter] = useState("All Time");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<LeaderboardUser | null>(null);

  const filtered = useMemo(() => {
    let data = [...leaderboardData];
    
    // Filter by view type
    if (view === "college") {
      data = data.filter(u => u.college === currentUser.college);
    }
    
    // Filter by college
    if (collegeFilter !== "All") {
      data = data.filter(u => u.college === collegeFilter);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      data = data.filter(u => 
        u.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Re-rank after filtering
    return data.map((user, index) => ({ ...user, rank: index + 1 }));
  }, [view, collegeFilter, searchQuery]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedData = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <span className="text-2xl">🥇</span>;
    if (rank === 2) return <span className="text-2xl">🥈</span>;
    if (rank === 3) return <span className="text-2xl">🥉</span>;
    return <span className="text-muted-foreground font-mono">#{rank}</span>;
  };

  const getRankChangeIndicator = (change: number) => {
    if (change > 0) {
      return (
        <span className="flex items-center gap-0.5 text-success text-xs font-medium">
          <TrendingUp className="w-3 h-3" />
          {change}
        </span>
      );
    }
    if (change < 0) {
      return (
        <span className="flex items-center gap-0.5 text-destructive text-xs font-medium">
          <TrendingDown className="w-3 h-3" />
          {Math.abs(change)}
        </span>
      );
    }
    return (
      <span className="flex items-center text-muted-foreground text-xs">
        <Minus className="w-3 h-3" />
      </span>
    );
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Leaderboard</h1>
        <p className="text-muted-foreground mt-1">See how you rank against other MBBS students.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Global Rank</span>
          </div>
          <p className="text-xl md:text-2xl font-bold text-foreground">
            #{currentUser.globalRank.toLocaleString()}
            <span className="text-sm font-normal text-muted-foreground ml-1">
              / {currentUser.globalTotal.toLocaleString()}
            </span>
          </p>
        </div>
        
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Building className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">College Rank</span>
          </div>
          <p className="text-xl md:text-2xl font-bold text-foreground">
            #{currentUser.collegeRank}
            <span className="text-sm font-normal text-muted-foreground ml-1">
              / {currentUser.collegeTotalStudents}
            </span>
          </p>
        </div>
        
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Your Score</span>
          </div>
          <p className="text-xl md:text-2xl font-bold text-foreground">
            {currentUser.score.toLocaleString()}
            <span className="text-sm font-normal text-muted-foreground ml-1">pts</span>
          </p>
        </div>
        
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Students</span>
          </div>
          <p className="text-xl md:text-2xl font-bold text-foreground">
            {currentUser.globalTotal.toLocaleString()}
          </p>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex flex-wrap gap-2">
        {(["global", "college"] as const).map(v => (
          <button
            key={v}
            onClick={() => { setView(v); setCurrentPage(1); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              view === v
                ? "gradient-orange text-primary-foreground shadow-lg"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {v === "global" ? "Global Ranking" : "College Ranking"}
          </button>
        ))}
      </div>

      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* College Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 flex-1">
          {colleges.map(c => (
            <button
              key={c}
              onClick={() => { setCollegeFilter(c); setCurrentPage(1); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                collegeFilter === c
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Time Filter */}
        <div className="flex gap-2">
          {timeFilters.map(t => (
            <button
              key={t}
              onClick={() => { setTimeFilter(t); setCurrentPage(1); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                timeFilter === t
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search student"
          value={searchQuery}
          onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
          className="pl-10 bg-secondary/50 border-border"
        />
      </div>

      {/* Your Position Card */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-4 md:p-5 border-primary/30 bg-primary/5"
      >
        <div className="flex items-center gap-2 mb-3">
          <Star className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Your Position</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Global Rank</p>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-foreground">#{currentUser.globalRank}</span>
              {getRankChangeIndicator(currentUser.rankChange)}
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">College Rank</p>
            <span className="text-lg font-bold text-foreground">#{currentUser.collegeRank}</span>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Solved</p>
            <span className="text-lg font-bold text-foreground">{currentUser.totalSolved}</span>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Accuracy</p>
            <span className="text-lg font-bold text-foreground">{currentUser.accuracy}%</span>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Score</p>
            <span className="text-lg font-bold text-primary">{currentUser.score} pts</span>
          </div>
        </div>
      </motion.div>

      {/* Leaderboard Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left p-3 md:p-4 text-muted-foreground font-medium w-20">Rank</th>
                <th className="text-left p-3 md:p-4 text-muted-foreground font-medium">User</th>
                <th className="text-left p-3 md:p-4 text-muted-foreground font-medium hidden md:table-cell">College</th>
                <th className="text-right p-3 md:p-4 text-muted-foreground font-medium">Solved</th>
                <th className="text-right p-3 md:p-4 text-muted-foreground font-medium hidden sm:table-cell">Accuracy</th>
                <th className="text-right p-3 md:p-4 text-muted-foreground font-medium">Score</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {paginatedData.map((user, i) => (
                  <motion.tr
                    key={user.username + user.rank}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.02 }}
                    onClick={() => setSelectedUser(user)}
                    className={`border-b border-border/50 hover:bg-secondary/50 transition-colors cursor-pointer ${
                      user.rank <= 3 ? "bg-primary/5" : ""
                    }`}
                  >
                    <td className="p-3 md:p-4">
                      <div className="flex items-center gap-2">
                        {getRankIcon(user.rank)}
                        {getRankChangeIndicator(user.rankChange)}
                      </div>
                    </td>
                    <td className="p-3 md:p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                          user.rank <= 3 
                            ? "gradient-orange text-primary-foreground" 
                            : "bg-primary/20 text-primary"
                        }`}>
                          {user.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div className="min-w-0">
                          <span className="font-medium text-foreground block truncate">{user.name}</span>
                          <span className="text-xs text-muted-foreground md:hidden">{user.college}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 md:p-4 text-muted-foreground hidden md:table-cell">{user.college}</td>
                    <td className="p-3 md:p-4 text-right font-mono text-foreground">{user.solved}</td>
                    <td className="p-3 md:p-4 text-right font-mono text-foreground hidden sm:table-cell">{user.accuracy}%</td>
                    <td className="p-3 md:p-4 text-right">
                      <span className={`font-bold ${user.rank <= 3 ? "text-primary" : "text-foreground"}`}>
                        {user.score}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            No students found matching your search.
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum: number;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    onClick={() => setCurrentPage(pageNum)}
                    isActive={currentPage === pageNum}
                    className="cursor-pointer"
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {/* User Profile Modal */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="glass-card border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                selectedUser?.rank && selectedUser.rank <= 3 
                  ? "gradient-orange text-primary-foreground" 
                  : "bg-primary/20 text-primary"
              }`}>
                {selectedUser?.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <span className="text-foreground">{selectedUser?.name}</span>
                <p className="text-sm font-normal text-muted-foreground">{selectedUser?.college}</p>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground">Questions Solved</span>
                  </div>
                  <span className="text-xl font-bold text-foreground">{selectedUser.solved}</span>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground">Accuracy</span>
                  </div>
                  <span className="text-xl font-bold text-foreground">{selectedUser.accuracy}%</span>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Trophy className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground">Score</span>
                  </div>
                  <span className="text-xl font-bold text-primary">{selectedUser.score} pts</span>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground">Top Subject</span>
                  </div>
                  <span className="text-lg font-bold text-foreground">{selectedUser.topSubject}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Rank #{selectedUser.rank}</span>
                </div>
                <Link 
                  to={`/profile/${selectedUser.username}`}
                  className="text-sm text-primary hover:underline font-medium"
                >
                  View Full Profile →
                </Link>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Leaderboard;
