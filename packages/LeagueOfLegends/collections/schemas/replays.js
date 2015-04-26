Superseder.Schema.registerOverride('ReplaysGeneralMetum', new SimpleSchema({
  poney: { type: String, label: "Champion" },
  matchup:  { type: String, label: "Matchup" },
  lane:     { type: String, label: "Lane" }
}));

Superseder.Schema.registerOverride('ReplaysSpecificMetum', new SimpleSchema({
  kda:   { type: String, label: "KDA" },
}));
