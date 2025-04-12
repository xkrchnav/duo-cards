export type Card = {
  front: string;
  hint?: string;
};

export function decorateHint(card: Card, asString = false) {
  if (!card.hint) {
    return asString ? "" : <></>;
  }

  let frontToSearch = card.front.toLocaleLowerCase();
  if (frontToSearch.startsWith("to ")) {
    frontToSearch = frontToSearch.slice(3);
  } else if (frontToSearch.startsWith("the ")) {
    frontToSearch = frontToSearch.slice(4);
  }

  const hintToSearch = card.hint.toLocaleLowerCase();
  const frontIndex = hintToSearch.indexOf(frontToSearch);

  if (frontIndex >= 0) {
    let isPrecededByThe = false;
    let isPrecededByTo = false;
    if (hintToSearch.slice(frontIndex - 4, frontIndex) === "the ") {
      isPrecededByThe = true;
    }
    if (hintToSearch.slice(frontIndex - 3, frontIndex) === "to ") {
      isPrecededByTo = true;
    }

    const decoratedStart =
      frontIndex - (isPrecededByThe ? 4 : isPrecededByTo ? 3 : 0);

    let decoratedEnd = frontIndex + frontToSearch.length;
    let spaceAfterDecoratedIndex = card.hint.indexOf(" ", decoratedEnd);

    if (spaceAfterDecoratedIndex > 0) {
      decoratedEnd = spaceAfterDecoratedIndex;
    }

    const before = card.hint.slice(0, decoratedStart);
    const decorated = card.hint.slice(decoratedStart, decoratedEnd);
    const after = card.hint.slice(decoratedEnd);

    return asString ? (
      `${before}<b>${decorated}</b>${after}`
    ) : (
      <>
        {before}
        <b>{decorated}</b>
        {after}
      </>
    );
  }

  return asString ? card.hint : <>{card.hint}</>;
}
