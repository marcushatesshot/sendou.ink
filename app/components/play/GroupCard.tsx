import clsx from "clsx";
import { useFetcher } from "remix";
import { Button, ButtonProps } from "~/components/Button";
import type {
  LookingActionSchema,
  LookingLoaderDataGroup,
} from "~/routes/play/looking";
import { GroupMembers } from "./GroupMembers";

export function GroupCard({
  group,
  action,
  showAction,
  ranked,
  isOwnGroup = false,
}: {
  group: LookingLoaderDataGroup;
  action?: Exclude<LookingActionSchema["_action"], "UNEXPIRE">;
  showAction: boolean;
  ranked?: boolean;
  isOwnGroup?: boolean;
}) {
  const fetcher = useFetcher();

  const buttonText = () => {
    switch (action) {
      case "LEAVE_GROUP":
        return "Leave group";
      case "LIKE":
        return "Let's play?";
      case "UNLIKE":
        return "Undo";
      case "UNITE_GROUPS":
        return "Group up";
      case "MATCH_UP":
        return "Match up";
      case "LOOK_AGAIN":
        return "Stop looking";
      default:
        throw new Error(`Invalid group action type: ${action ?? "UNDEFINED"}`);
    }
  };
  const buttonVariant = (): ButtonProps["variant"] => {
    switch (action) {
      case "LEAVE_GROUP":
      case "LOOK_AGAIN":
        return "minimal-destructive";
      case "UNLIKE":
        return "destructive";
      default:
        return undefined;
    }
  };

  return (
    <fetcher.Form method="post">
      <div className="play-looking__card">
        {typeof ranked === "boolean" && (
          <div className={clsx("play-looking__ranked-text", { ranked })}>
            {ranked ? "Ranked" : "Unranked"}
          </div>
        )}
        <GroupMembers members={group.members} />
        {group.teamMMR && (
          <div className="play-looking__mmr">
            MMR: {!group.teamMMR.exact && <>~</>}
            {group.teamMMR.value}
          </div>
        )}
        <input type="hidden" name="targetGroupId" value={group.id} />
        {action === "UNITE_GROUPS" && (
          <input
            type="hidden"
            name="targetGroupSize"
            value={group.members?.length ?? -1}
          />
        )}
        {showAction && (
          <Button
            className={
              isOwnGroup
                ? "play-looking__card__button-small"
                : "play-looking__card__button"
            }
            type="submit"
            name="_action"
            value={action}
            tiny
            variant={buttonVariant()}
            loading={fetcher.state !== "idle"}
          >
            {buttonText()}
          </Button>
        )}
      </div>
    </fetcher.Form>
  );
}
