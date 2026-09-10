# Product Requirements — Abyssal Colony Manager MVP

**Status:** Accepted  
**Owner:** Rafael Neves  
**Platform:** Mobile web and PWA  
**Delivery horizon:** Four weeks

## 1. Vision

A web management and survival game set on a floating research station above an alien ocean. The player manages resources, builds modules and guides three crew members with personalities, needs, relationships and short memories.

AI creates contextual narrative for events and consequences but does not control the core game rules.

## 2. Objective

Validate a short, shareable, mobile-first loop in which management decisions create emergent stories.

The project must also publicly demonstrate:

- Product engineering.
- Applied AI architecture.
- Cost, latency, reliability and user-experience trade-offs.
- MVP execution and metric-driven learning.

## 3. Target audience

- People arriving from LinkedIn on mobile devices.
- Technology and AI professionals.
- Casual simulation, light strategy and narrative game players.
- Recruiters and technical leaders.

## 4. Value proposition

> Manage a station on the ocean of an unknown planet, where crew decisions become stories that persist.

## 5. Non-goals

The MVP excludes:

- Multiplayer.
- Native mobile applications.
- An open world.
- Combat.
- Free-form NPC chat.
- A complex economy.
- Monetization.
- Final art.
- Multiple maps or biomes.
- Extensive procedural generation.

## 6. Platform and user experience

### Platform

- Responsive, installable web application.
- iOS Safari and Android Chrome are the primary browsers.
- Portrait is the primary layout.
- Desktop is a secondary responsive experience.

### Targets

- Initial load under three seconds.
- First action under ten seconds.
- Session length between three and seven minutes.
- No login required for the first session.
- Recoverable local progress.

### Interaction

- Draggable, pinch-to-zoom map.
- Bottom sheets for details.
- Action buttons in the lower screen area.
- Event cards with two or three choices.
- No essential action depends on hover or a keyboard.

## 7. Core loop

1. The player starts the station.
2. The player meets the three crew members.
3. The player sets an operational priority.
4. Crew members perform tasks using deterministic rules.
5. An event, discovery or failure occurs.
6. The player chooses a response.
7. Resources, morale, safety and relationships change.
8. AI generates a short narrative consequence and updates relevant memories.
9. The session ends with an expedition report.

## 8. Setting and world

The station operates on a planet entirely covered by ocean. The surface provides energy and communications; the depths provide materials, scientific discoveries and risks.

### Map areas

- Surface platform.
- Habitation module.
- Cultivation area.
- Tidal generator.
- Laboratory.
- Submersible dock.
- Underwater exploration zone.

The MVP uses one compact map without travel to other biomes.

## 9. Resources

| Resource            | Purpose                               |
| ------------------- | ------------------------------------- |
| Power               | Keeps modules and systems operational |
| Oxygen              | Required for survival and missions    |
| Food                | Sustains the crew                     |
| Recovered materials | Used for construction and repairs     |

## 10. Construction

| Construction           | Effect                                    |
| ---------------------- | ----------------------------------------- |
| Habitation module      | Rest and morale recovery                  |
| Hydroponic cultivator  | Produces food                             |
| Tidal generator        | Produces power                            |
| Water and air purifier | Maintains oxygen                          |
| Laboratory             | Unlocks discoveries and scientific events |
| Submersible dock       | Unlocks deep exploration                  |

The first version must allow the player to build, repair and inspect every module.

## 11. Crew

Every session begins with three crew members. Each crew member has:

- Name.
- Role.
- Personality trait.
- Hunger.
- Energy.
- Morale.
- Safety.
- Current task.
- Simple relationships with the other crew members.
- Recent memories.

### Initial roles

- Engineer: repairs and power.
- Biologist: food, laboratory and discoveries.
- Explorer: material collection and underwater missions.

### Possible traits

- Cautious.
- Curious.
- Pragmatic.
- Sociable.
- Impulsive.

## 12. Deterministic rules

The game must remain fully playable when AI is unavailable.

- High hunger causes a crew member to seek food.
- Low energy causes a crew member to rest.
- Systems with insufficient power lose productivity.
- Low oxygen reduces safety and triggers alerts.
- Low morale reduces efficiency.
- Construction consumes materials.
- Exploration requires power and oxygen.
- Player priorities influence task distribution.

Exact values and ordering belong in [the authoritative game rules](game-rules.md).

## 13. Player actions

The player can:

- Choose a global priority: survival, power, research or exploration.
- Build or repair modules.
- Monitor station resources.
- Inspect crew members.
- Respond to events.
- End the expedition and view the final report.

## 14. Events

### Types

- Tidal generator failure.
- Module leak.
- Oxygen level drop.
- Surface storm.
- Signal from the depths.
- Discovery of an unknown organism.
- Rare material found.
- Conflict over a dangerous expedition.
- Request for rest or repair.
- Submersible damage.

### Structure

Every event contains:

- Type and trigger condition.
- Structured station context.
- Involved crew members when applicable.
- Short narrative text.
- Two or three choices.
- Allowed, validated consequences.

### Example

**Event:** A repeating signal was detected below the recommended depth.

**Choices:**

1. Send the submersible.
2. Delay the investigation and reinforce the station.
3. Analyze the signal in the laboratory.

**Possible consequences:**

- Power and oxygen consumption.
- Materials or a discovery.
- Increased or reduced safety.
- A memory recorded for involved crew members.

## 15. Role of AI

### AI may

- Generate an event description from an allowed event type.
- Write a short narrative consequence after a choice.
- Summarize relevant crew memories.
- Create the final expedition report.

### AI may not

- Modify rules or numeric values.
- Create systems, resources or characters outside the approved world.
- Control NPCs in real time.
- Block the game loop.
- Replace backend validation.

### Contract

All responses use validated JSON. Numeric consequences in the structured context are facts already calculated by the deterministic engine, never AI proposals.

```json
{
  "eventType": "deep_signal",
  "crewInvolved": ["explorer"],
  "narrative": "Sonar recorded a repeating pattern below the safety zone.",
  "consequences": {
    "energyDelta": -5,
    "oxygenDelta": 0,
    "safetyDelta": -3
  },
  "memoryUpdates": [
    {
      "crewId": "explorer",
      "memory": "An unusual signal was detected in deep water."
    }
  ]
}
```

## 16. User flows

### First visit

1. Open the link.
2. See a short introduction.
3. Select “Start expedition.”
4. Meet the crew.
5. Choose the initial priority.
6. Begin the first cycle.

### Gameplay

1. View the map, resources and station state.
2. Change the priority or build and repair.
3. Receive an event.
4. Choose a response.
5. See the structured effect and narrative.
6. Continue until completing or ending the session.

### Final flow

1. The session reaches a milestone or the player ends it.
2. Display the expedition report.
3. Display days, resources, morale, safety and events.
4. Create a shareable card.
5. Allow a new expedition.

## 17. Interface

### Main screen

- Central map with the platform and modules.
- Top bar with power, oxygen, food, materials and day or cycle.
- Bottom bar with priority, build, crew and status actions.

### Crew

Each card shows name, role, state and current task. Selecting it reveals personality trait, needs, relationships and recent memories.

### Events

- Prominent card that does not block essential animation.
- Short context.
- Two or three options.
- Immediate feedback about structured consequences.

### Report

- Expedition title.
- Short narrative.
- Days survived.
- Final resources.
- Average morale.
- Safety level.
- Discoveries.
- Resolved events.
- A card ready to copy or share.

## 18. Technical architecture

```text
React interface and navigation
            ↕
Phaser map, animation and interaction
            ↕
TypeScript API
            ↕
Deterministic rules and persistence
            ↕
PostgreSQL and durable job queue
            ↕
AI service
```

### Frontend

- Phaser and TypeScript for scenes, the map and visual NPC representation.
- React and TypeScript for interface and navigation.
- Vite for development and builds.
- Reference viewport of 390×844.

### Backend

- TypeScript API.
- PostgreSQL for users, stations, crew, events, decisions and memories.
- Durable queue for AI requests.
- Per-session rate limiting and budget.
- Error, cost and latency logs.

### Persistence

- Anonymous first session.
- Opaque local identifier for resuming an expedition.
- Optional registration only after the player experiences value.

The server is authoritative. Local storage contains the resume token and recoverable presentation state, not a parallel game authority.

## 19. Cost strategy

- Use AI only for events and session summaries.
- Never call AI for movement, frames or routine tasks.
- Summarize world context.
- Consolidate and limit memory.
- Apply a fixed token budget per event.
- Cache instructions and static content.
- Use predefined event text as fallback.

**Target:** average total cost below US$0.25 per engaged user per month.

## 20. Metrics

### Activation

- At least 80% of started sessions occur on mobile.
- At least 60% of visitors start an expedition.
- First action occurs in under ten seconds.

### Engagement

- Average session of at least five minutes.
- At least three events resolved per session.
- At least 40% complete the first session.
- At least 50% of engaged players start a second expedition.

### Sharing

- At least 10% use the final card.

### Technical

- AI response in under three seconds.
- Game remains playable without AI.
- Cost remains within budget.
- Generation errors are recorded and handled.

## 21. Instrumentation

Minimum events:

```text
game_opened
onboarding_started
expedition_started
priority_changed
module_built
module_repaired
crew_viewed
event_shown
event_option_selected
ai_request_started
ai_request_completed
ai_request_failed
expedition_completed
report_shared
new_expedition_started
```

Also record platform and browser, load time, session duration, resolved events, AI latency and failure, estimated tokens, estimated cost and player choices.

## 22. Risks and mitigation

| Risk                                | Mitigation                                           |
| ----------------------------------- | ---------------------------------------------------- |
| Excessive scope                     | One map, three crew members and six modules          |
| Expensive AI                        | Call, token and budget limits                        |
| Slow AI                             | Durable jobs, visible feedback and fallback          |
| Inconsistent AI                     | Validated JSON and deterministic consequences        |
| Poor mobile UX                      | Portrait-first design and real-device testing        |
| Product feels like a technical demo | Prioritize decisions, consequences and replayability |

## 23. Delivery plan

### Week 1 — Base

- Map and mobile layout.
- Resources.
- Three crew members.
- Needs and tasks.
- Anonymous persistence.

### Week 2 — Management

- Priorities.
- Construction and repairs.
- Deterministic events.
- Structured consequences.
- Initial instrumentation.

### Week 3 — AI

- Narrative events.
- Short memories.
- Expedition report.
- Fallbacks.
- Cost and latency monitoring.

### Week 4 — Launch

- Onboarding.
- Shareable card.
- iOS Safari and Android Chrome testing.
- Testing with 10–20 people.
- Corrections, landing page and publication.

## 24. Launch criteria

The MVP is ready when it:

- Works on mobile without mandatory login.
- Supports a complete three-to-seven-minute session.
- Has three crew members, resources, modules and priorities.
- Has events with choices and consequences.
- Uses validated structured AI output.
- Has a complete non-AI fallback.
- Generates a shareable final report.
- Collects product, cost, latency and error metrics.
