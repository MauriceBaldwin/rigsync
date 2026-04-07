import {
  AadResponse,
  ContainerResponse,
  MainCanopyResponse,
  ReserveCanopyResponse,
} from "../../api";

export const withDescription = (
  baseFormat: string,
  item: { description?: string },
): string =>
  baseFormat + (item.description ? ` (${item.description})` : '');

export const formatMainCanopy = (mainCanopy: MainCanopyResponse): string =>
  mainCanopy.model + ' ' + mainCanopy.size.toString();

export const formatMainCanopyWithDescription = (
  mainCanopy: MainCanopyResponse,
): string =>
  withDescription(formatMainCanopy(mainCanopy), mainCanopy);

export const formatReserveCanopy = (
  reserveCanopy: ReserveCanopyResponse,
): string =>
  reserveCanopy.model + ' ' + reserveCanopy.size.toString();

export const formatReserveCanopyWithDescription = (
  reserveCanopy: ReserveCanopyResponse,
): string =>
  withDescription(formatReserveCanopy(reserveCanopy), reserveCanopy);

export const formatAad = (aad: AadResponse): string =>
  aad.manufacturer + ' ' + aad.model;

export const formatAadWithDescription = (aad: AadResponse): string =>
  withDescription(formatAad(aad), aad);

export const formatContainer = (container: ContainerResponse): string =>
  container.manufacturer + ' ' + container.model;

export const formatContainerWithDescription = (
  container: ContainerResponse,
): string =>
  withDescription(formatContainer(container), container);
