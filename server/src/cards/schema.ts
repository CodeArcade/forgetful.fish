import { z } from "zod";

export const cardSchema = z.object({
  title: z.string().min(1),
  type: z.enum(["creature", "sorcery", "instant", "land"]),
  effects: z.array(
    z.object({
      type: z.enum([
        "exile",
        "exile_x",
        "draw_x",
        "draw_x_based_off_title_in_target",
        "put_x_cards",
        "discard",
        "counter",
        "change_basic_land_occurance",
        "change_color_occurance",
        "counter_unless_x_payed",
        "cycling_x",
        "tap",
        "untap",
        "gain_control_of_permanent",
        "grant_haste",
        "bounce_creature",
        "create_token_copy",
        "create_mana",
        "scry",
      ]),
      triggers: z.array(
        z.enum(["enter_the_battlefield", "cast", "state_based_action"])
      ),
      amount: z.number().optional(),
      target: z.enum(["permanent", "hand", "deck", "graveyard"]).optional(),
    })
  ),
  cost: z.array(
    z.object({
      amount: z.number(),
      color: z.enum(["colorless", "blue", "red"]), // dandan only features red and blue in its deck
    })
  ),
});

export type Card = z.infer<typeof cardSchema>;
