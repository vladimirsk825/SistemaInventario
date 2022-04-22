import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { some, none, Option, match } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/function'
import { Node, SearchableNode, NodeInTree } from '../../modelos/models';

@Injectable({
  providedIn: 'root'
})
export class TreeService {

  traverse<T, K extends Node<T>>(root: K, f: (node: K) => void): void {
    this._traverse(root, (node: K) => {
      f(node);
      return true;
    });
  }

  private _traverse<T, K extends Node<T>>(root: K, f: (node: K) => boolean): void {
    if (!f(root)) {
      return;
    }
    root.children.forEach((c:any) => this._traverse(c, f));
  }
  
  getNodeDepth<T, K extends SearchableNode<T>>(root: K, node: K): number {
    return pipe(this.searchById(root, node.id), match(() => -1, (n) => n.pathToRoot.length));
  }

  searchById<T, K extends SearchableNode<T>>(root: K, id: string): Option<NodeInTree<T>> {
    let matchingNode: K;
    const pathToRoot: {[k: string]: K} = {};
    this._traverse(root, (node: K) => {
      node.children.forEach(child => {
        pathToRoot[child.id] = node;
      });
      if (node.id === id) {
        matchingNode = node;
      }
      return node.id !== id;
    });
    return matchingNode ? some({
      id: matchingNode.id,
      value: matchingNode.value,
      children: matchingNode.children,
      pathToRoot: this.buildPath(id, pathToRoot)
    }) : none;
  }

  private buildPath<T, K extends SearchableNode<T>>(id: string, pathMap: {[k: string]: K}): K[] {
    const pathToRoot = [];
    let key = id;
    while (key) {
      if (pathMap[key]) {
        pathToRoot.push(pathMap[key]);
        key = pathMap[key].id;
      } else {
        key = null;
      }
    }
    return pathToRoot;
  }

  flatten<T, K extends Node<T>>(root: K): K[] {
    const result = [cloneDeep(root)];
    for (let i = 0; i < result.length; i++) {
      const node = result[i];
      if (node.children) {
        result.splice(result.indexOf(node) + 1, 0, ...node.children as K[]);
      }
    }
    return result;
  }
}