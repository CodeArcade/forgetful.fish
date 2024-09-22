import { EventEmitter } from "events";
import { initTRPC } from "@trpc/server";
import { observable } from "@trpc/server/observable";
import { z } from "zod";

type Post = z.infer<typeof postSchema>;

const eventEmitter = new EventEmitter();
const trpc = initTRPC.create();

const postSchema = z.object({
  id: z.string().uuid().optional(),
  text: z.string().min(1),
});

export const appRouter = trpc.router({
  onAdd: trpc.procedure.subscription(() => {
    return observable((emit) => {
      const onAdd = (data: Post) => {
        emit.next(data);
      };

      eventEmitter.on("add", onAdd);

      return () => eventEmitter.off("add", onAdd);
    });
  }),
  add: trpc.procedure
    .input(postSchema)

    .mutation(async (opts) => {
      const post = { ...opts.input };
      eventEmitter.emit("add", post);
      return post;
    }),
});
