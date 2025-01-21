export const dummyIssues = [
    {
      id: "issue-001",
      title: "Water Leakage in Main Road",
      latitude: "16.5062",
      longitude: "80.6480",
      description: "Continuous water leakage causing road damage and safety hazards.",
      image: "https://imgs.search.brave.com/3CXqo-nNYc74YD4XIgyrIgee8X0nPGGCktk3kDxFonU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dGhlc3BydWNlLmNv/bS90aG1iL0NYM21n/THZ6TWhaalVFRmVo/aC1Rc2o5ZHUtaz0v/MzE1eDIwOC9maWx0/ZXJzOm5vX3Vwc2Nh/bGUoKTptYXhfYnl0/ZXMoMTUwMDAwKTpz/dHJpcF9pY2MoKS9V/bmRlcmdyb3VuZFdh/dGVyTGluZS1Ccm9r/ZW4tNzE3Yzg3Y2Zm/YzNjNDkwMzk4OGZl/MGRmYWNhNzI4MDku/anBn",
      userId: "citizen-001",
      officeId: "office-001",
      status: "PENDING",
      dispute: false,
      createdAt: new Date("2025-01-02"),
      isAnonymous: false,
      location: "POINT(80.6480 16.5062)",
      updates: [
        { id: "update-001", description: "Issue reported by citizen.", createdAt: new Date("2025-01-02") },
      ],
      upVotes: ["citizen-002", "citizen-003", "citizen-004"],
      address: "Main Road, Vijayawada, Andhra Pradesh",
    },
    {
      id: "issue-002",
      title: "Streetlight Not Working",
      latitude: "16.3050",
      longitude: "80.4365",
      description: "Dark street causing safety concerns for pedestrians.",
      image: "https://imgs.search.brave.com/fNfptVclAUZqBeC8_3m5uyE3bxjivjanhMiDztuCTrE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy8w/LzBmL1ByaXNtYWxl/bmNlX3N0cmVldF9s/aWdodC5qcGc",
      userId: "citizen-005",
      officeId: "office-001",
      status: "IN_PROGRESS",
      dispute: false,
      createdAt: new Date("2025-01-03"),
      isAnonymous: true,
      location: "POINT(80.4365 16.3050)",
      updates: [
        { id: "update-002", description: "Issue reported by citizen.", createdAt: new Date("2025-01-03") },
        { id: "update-003", description: "Electrical team dispatched.", createdAt: new Date("2025-01-04") },
      ],
      upVotes: ["citizen-006", "citizen-007"],
      address: "Eluru Road, Guntur, Andhra Pradesh",
    },
    {
      id: "issue-003",
      title: "Garbage Not Collected",
      latitude: "16.3067",
      longitude: "80.4369",
      description: "Overflowing garbage bins attracting pests.",
      image: "https://imgs.search.brave.com/S2IVXTozs6BTmF2lrjXgB-x8-eZCJlJL8u8t3SyVJuk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI3/MjUwNzEyNS9waG90/by9nYXJiYWdlLXJl/Y3ljbGluZy1tYXRl/cmlhbC1jb2xsZWN0/b3JzLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz0tV0FiUXdR/enV1aTM1SzBsTWs3/RnY2MWw1XzFSUl9Y/cEE3bkJQVkRaNTh3/PQ",
      userId: "citizen-008",
      officeId: "office-001",
      status: "PENDING",
      dispute: false,
      createdAt: new Date("2025-01-04"),
      isAnonymous: false,
      location: "POINT(80.4369 16.3067)",
      updates: [
        { id: "update-004", description: "Issue reported by citizen.", createdAt: new Date("2025-01-04") },
      ],
      upVotes: ["citizen-009"],
      address: "Ring Road, Guntur, Andhra Pradesh",
    },
    {
      id: "issue-004",
      title: "Potholes on Highway",
      latitude: "15.9129",
      longitude: "79.7400",
      description: "Potholes causing frequent accidents.",
      image: "/images/potholes.jpg",
      userId: "citizen-010",
      officeId: "office-002",
      status: "RESOLVED",
      dispute: false,
      createdAt: new Date("2025-01-01"),
      isAnonymous: false,
      location: "POINT(79.7400 15.9129)",
      updates: [
        { id: "update-005", description: "Issue reported by citizen.", createdAt: new Date("2025-01-01") },
        { id: "update-006", description: "Road repair initiated.", createdAt: new Date("2025-01-02") },
        { id: "update-007", description: "Potholes filled.", createdAt: new Date("2025-01-03") },
      ],
      upVotes: ["citizen-011", "citizen-012", "citizen-013"],
      address: "National Highway 16, Ongole, Andhra Pradesh",
    },
    // Additional 16 issues added here...
  ];
  
  // Populating more issues with similar structure, focusing on areas in Andhra Pradesh such as Visakhapatnam, Tirupati, Kurnool, etc.
  for (let i = 5; i <= 20; i++) {
    dummyIssues.push({
      id: `issue-${String(i).padStart(3, "0")}`,
      title: i % 3 === 0 ? "Damaged Footpath" : i % 4 === 0 ? "Open Manhole" : "Illegal Dumping of Waste",
      latitude: i % 2 === 0 ? "16.5062" : "17.6868",
      longitude: i % 2 === 0 ? "80.6480" : "83.2185",
      description:
        i % 3 === 0
          ? "Broken tiles on the footpath causing difficulty for pedestrians."
          : i % 4 === 0
          ? "Open manhole is a major safety concern."
          : "Dumped waste causing environmental hazards.",
      image: `https://imgs.search.brave.com/S2IVXTozs6BTmF2lrjXgB-x8-eZCJlJL8u8t3SyVJuk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI3/MjUwNzEyNS9waG90/by9nYXJiYWdlLXJl/Y3ljbGluZy1tYXRl/cmlhbC1jb2xsZWN0/b3JzLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz0tV0FiUXdR/enV1aTM1SzBsTWs3/RnY2MWw1XzFSUl9Y/cEE3bkJQVkRaNTh3/PQ`,
      userId: `citizen-${String(i).padStart(3, "0")}`,
      officeId: `office-${i % 4 === 0 ? "002" : "001"}`,
      status: i % 2 === 0 ? "IN_PROGRESS" : "PENDING",
      dispute: false,
      createdAt: new Date(`2025-01-${String(i).padStart(2, "0")}`),
      isAnonymous: i % 2 === 0,
      location: `POINT(${i % 2 === 0 ? "80.6480" : "83.2185"} ${i % 2 === 0 ? "16.5062" : "17.6868"})`,
      updates: [
        {
          id: `update-${String(i * 3 - 2).padStart(3, "0")}`,
          description: "Issue reported by citizen.",
          createdAt: new Date(`2025-01-${String(i).padStart(2, "0")}`),
        },
        {
          id: `update-${String(i * 3 - 1).padStart(3, "0")}`,
          description: "Assigned to respective office.",
          createdAt: new Date(`2025-01-${String(i).padStart(2, "0")}`),
        },
      ],
      upVotes: [`citizen-${i - 1}`, `citizen-${i - 2}`],
      address:
        i % 3 === 0
          ? "MG Road, Visakhapatnam, Andhra Pradesh"
          : i % 4 === 0
          ? "Govindaraja Swamy Temple, Tirupati, Andhra Pradesh"
          : "Railway Station Road, Kurnool, Andhra Pradesh",
    });
  }
